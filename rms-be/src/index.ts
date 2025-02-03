import { Router } from "./engine/Router";
import { ServiceProvider } from "./engine/ServiceProvider";

const allowedOrginis = [
	"http://localhost:4200",
	"https://rms.blaczko.com"
]

export default {

	async fetch(request, env, ctx): Promise<Response> {
		ServiceProvider.init(env);

		var response = await Router.execute(request, env, ctx);

		var origin = request.headers.get("Origin");
		if (origin && allowedOrginis.includes(origin)) {
			response.headers.set("Access-Control-Allow-Origin", origin);
		}

		return response;
	},
} satisfies ExportedHandler<Env>;
