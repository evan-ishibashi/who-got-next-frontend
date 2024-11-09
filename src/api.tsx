import { loginFormData, registerPlayerFormData } from "./types";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class whoGotNextApi {
    // Remember, the backend needs to be authorized with a token
    // We're providing a token you can use to interact with the backend API
    // DON'T MODIFY THIS TOKEN
    static token = localStorage.getItem("authToken");
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    static async request(endpoint:String, data = {}, method = "GET") {
        const url = new URL(`${BASE_URL}/${endpoint}`);
        const headers = {
            authorization: `Bearer ${whoGotNextApi.token}`,
            "content-type": "application/json",
        };

        url.search =
            method === "GET" ? new URLSearchParams(data).toString() : "";

        // set to undefined since the body property cannot exist on a GET method
        const body = method !== "GET" ? JSON.stringify(data) : undefined;

        const resp = await fetch(url, { method, body, headers });

        //fetch API does not throw an error, have to dig into the resp for msgs
        if (!resp.ok) {
            console.error("API Error:", resp.statusText, resp.status);
            const { error } = await resp.json();
            throw Array.isArray(error) ? error : [error];
        }

        return await resp.json();
    }


    // Individual API routes

    /** Get details on a company by handle. */

    static async getCompany(handle:String) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /** Get all jobs. */

    static async getJobs(title:String) {
        let res;
        title ? res = await this.request('jobs/', { "title": title }) :
            res = await this.request('jobs/');

        return res.jobs;
    }

    /** Get all companies, optional filter for name */

    static async getCompanies(nameLike:String) {
        let res;
        nameLike ? res = await this.request('companies/', { "nameLike": nameLike }) :
            res = await this.request('companies/');

        return res.companies;
    }

    /** Logs user in
     *
     * Takes in {username, password} in formData
     *
     * Returns jwt
    */
    static async getTokenLogin(formData:loginFormData) {
        // console.log(formData);
        let res = await whoGotNextApi.request(`auth/token`, formData, "POST");
        return res.token;
    }

    /** Registers User
     *
     * Takes {username, password, firstName, lastName, email} in formData,
     *
     * Returns jwt
    */
    static async getTokenRegister(formData:registerPlayerFormData) {
        let res = await whoGotNextApi.request(`auth/register`, formData, "POST");
        return res.token;
    }

    /** Gets User
     *
     * Takes in username
     *
     * Returns userData: {username, firstName, lastName, email, applications}
    */
    static async getUser(username:string) {
        let res = await whoGotNextApi.request(`users/${username}`);
        return res.user;
    }

    /** Updates User
     *
     * Takes in username
     *
     * Returns userData: {username, firstName, lastName, email, applications}
    */
    static async patchUser(username:String, formData:registerPlayerFormData) {
        let res = await whoGotNextApi.request(`users/${username}`, formData, "PATCH");
        return res.user;
    }

}

export default whoGotNextApi;