import { IClient, IRequest, IResponse, IResponseAttributes } from "@konceiver/httpie";
import "jest-extended";
import { URL } from "url";

export const complianceTests = (
	createClient: () => IClient,
	createRequest: () => IRequest,
	createResponse: (attributes: IResponseAttributes) => IResponse,
): void => {
	describe("Client", () => {
		test("get", async () => {
			const response: IResponse = await createClient().get("https://httpbin.org/get");

			expect(response.getStatusCode()).toBe(200);
		});

		test("post", async () => {
			const response: IResponse = await createClient().post("https://httpbin.org/post");

			expect(response.getStatusCode()).toBe(200);
		});

		test("put", async () => {
			const response: IResponse = await createClient().put("https://httpbin.org/put");

			expect(response.getStatusCode()).toBe(200);
		});

		test("patch", async () => {
			const response: IResponse = await createClient().patch("https://httpbin.org/patch");

			expect(response.getStatusCode()).toBe(200);
		});

		test("head", async () => {
			const response: IResponse = await createClient().head("https://httpbin.org/get");

			expect(response.getStatusCode()).toBe(200);
		});

		test("delete", async () => {
			const response: IResponse = await createClient().delete("https://httpbin.org/delete");

			expect(response.getStatusCode()).toBe(200);
		});

		test("get (error)", async () => {
			const response: IResponse = await createClient().get("https://httpbin.org/status/400");

			expect(response.getStatusCode()).toBe(400);
			expect(response.getStatusMessage()).toBe("BAD REQUEST");
		});
	});

	describe("Request", () => {
		test("getMethod", () => {
			const request: IRequest = createRequest();

			expect(request.getMethod()).toBeUndefined();

			request.withMethod("get");

			expect(request.getMethod()).toBe("get");
		});

		test("getUrl (with string)", () => {
			const request: IRequest = createRequest();

			expect(request.getUrl()).toBeUndefined();

			request.withUrl("https://httpbin.org/");

			expect(request.getUrl()).toEqual(new URL("https://httpbin.org/"));
		});

		test("getUrl (with URL)", () => {
			const request: IRequest = createRequest();

			expect(request.getUrl()).toBeUndefined();

			request.withUrl(new URL("https://httpbin.org/"));

			expect(request.getUrl()).toEqual(new URL("https://httpbin.org/"));
		});

		test("getOptions", () => {
			const request: IRequest = createRequest();

			expect(request.getOptions()).toBeUndefined();

			request.withOptions({ hello: "world" });

			expect(request.getOptions()).toEqual({ hello: "world" });
		});
	});

	describe("Response", () => {
		const response: IResponseAttributes = {
			body: "Hello World",
			headers: { "content-type": "application/json" },
			statusCode: 200,
			statusMessage: "OK",
		};

		test("getBody", () => {
			expect(createResponse(response).getBody()).toBe(response.body);
		});

		test("getStatusCode", () => {
			expect(createResponse(response).getStatusCode()).toBe(response.statusCode);
		});

		test("getStatusMessage", () => {
			expect(createResponse(response).getStatusMessage()).toBe(response.statusMessage);
		});

		test("getHeaders", () => {
			expect(createResponse(response).getHeaders()).toEqual(response.headers);
		});

		test("getHeader", () => {
			expect(createResponse(response).getHeader("content-type")).toBe(response.headers["content-type"]);
		});
	});
};
