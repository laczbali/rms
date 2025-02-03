import { migrations } from "./Migrations";
import { SchemaMigration } from "./models/SchemaMigration";

export class DbProvider {

    private static readonly TargetSchemaVersion = 1;
    private static ActualSchemaVersion = 0;

    private static db: D1Database;

    constructor(database: D1Database) {
        DbProvider.db = database;
    }

    public static async run<T>(query: string, ...params: any[]): Promise<T[]> {
        var preparedQuery = await DbProvider.db.prepare(query);
        if (params.length > 0) {
            preparedQuery = preparedQuery.bind(params);
        }

        var results = await preparedQuery.all<T>();
        return results.results;
    }

    private static async validateSchema(): Promise<void> {
        if (DbProvider.ActualSchemaVersion === DbProvider.TargetSchemaVersion) {
            return;
        }

        // get current db version
        var queriedDbVersion = 0;
        try {
            const query = await DbProvider.db.prepare(`
                SELECT version FROM schema_migrations
                ORDER BY version DESC
                LIMIT 1
            `)
            const result = await query.first<SchemaMigration>();
            queriedDbVersion = result?.version ?? 0;
        }
        catch (e) { }

        if (queriedDbVersion === DbProvider.TargetSchemaVersion) {
            DbProvider.ActualSchemaVersion = DbProvider.TargetSchemaVersion;
            return;
        }

        if (queriedDbVersion > DbProvider.TargetSchemaVersion) {
            throw new Error("Database schema version is higher than expected.");
        }

        // run migrations
        var scripts = migrations.slice(queriedDbVersion, migrations.length);
        for (var i = 0; i < scripts.length; i++) {
            const query = await DbProvider.db.prepare(scripts[i]);
            await query.run();
        }
        DbProvider.ActualSchemaVersion = DbProvider.TargetSchemaVersion;
    }

}
