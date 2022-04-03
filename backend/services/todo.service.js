"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "todo",
	// version: 1

	/**
	 * Action Hooks
	 */
	hooks: {
	},

	/**
	 * Mixins
	 */
	mixins: [
		DbMixin("todo")
	],

	/**
	 * Settings
	 */
	settings: {
		// Configures the Access-Control-Allow-Origin CORS header.
		origin: "*",
		// Configures the Access-Control-Allow-Methods CORS header.
		methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "HEAD"],
		// Configures the Access-Control-Allow-Headers CORS header.
		allowedHeaders: "*",
		// Configures the Access-Control-Expose-Headers CORS header.
		exposedHeaders: [],
		// Configures the Access-Control-Allow-Credentials CORS header.
		credentials: true,
		// Configures the Access-Control-Max-Age CORS header.
		// Available fields in the responses

		routes: [{
			path: "/api",

			// Route CORS settings (overwrite global settings)
			cors: {
				origin: ["*"],
				methods: ["GET", "OPTIONS", "POST"],
				credentials: true
			},
		}]
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		options: {
			rest: {
				method: "OPTIONS",
				path: "/list"
			},
			async handler(ctx) {
				ctx.writeHead(200, {"Content-Type": "application/json"});
				return ctx;
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([
				{position: 1, name: 'Take out trash', time: 0.25 },
				{position: 2, name: 'Clean Room', time: 0.5 },
				{position: 3, name: 'Play Video Games', time: 5 },
				{position: 4, name: 'Go to hockey game', time: 2 },
			]);
		}
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
