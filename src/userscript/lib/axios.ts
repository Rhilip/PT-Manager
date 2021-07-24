// @ts-nocheck
import axios, { AxiosResponse,AxiosPromise, AxiosRequestConfig } from "axios";
import createError from "axios/lib/core/createError";
import settle from "axios/lib/core/settle";
import buildURL from "axios/lib/helpers/buildURL";
import parseHeaders from "axios/lib/helpers/parseHeaders";
import buildFullPath from "axios/lib/core/buildFullPath";
import utils from "axios/lib/utils";

/**
 * this adapter is edited from https://github.com/Trim21/axios-userscript-adapter
 * @param config
 */
axios.defaults.adapter = function (config: AxiosRequestConfig): AxiosPromise<any> {
    return new Promise((resolve, reject) => {
        let requestData = config.data;
        const requestHeaders = config.headers;

        if (utils.isFormData(requestData)) {
            delete requestHeaders["Content-Type"]; // Let the browser set it
        }

        // HTTP basic authentication
        if (config.auth) {
            const username = config.auth.username || "";
            const password = config.auth.password || "";
            requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }

        // Handle low level network errors
        const onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(createError("Network Error", config));
        };

        // Handle timeout
        const ontimeout = function handleTimeout() {
            reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED"));
        };

        // Remove Content-Type if data is undefined
        utils.forEach(requestHeaders, function setRequestHeader(val: any, key: string) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
                // Remove Content-Type if data is undefined
                delete requestHeaders[key];
            }
        });

        if (requestData === undefined) {
            requestData = null;
        }

        // Send the request
        // Listen for ready state
        const onload = function handleLoad(resp: Tampermonkey.Response<any>) {
            // Prepare the response
            const responseHeaders = "responseHeaders" in resp ? parseHeaders(resp.responseHeaders) : null;
            const responseData =
                !config.responseType || config.responseType === "text" ? resp.responseText : resp.response;
            const response: AxiosResponse = {
                data: responseData,
                status: resp.status,
                statusText: resp.statusText,
                headers: responseHeaders,
                config: config,
                request: {
                    // can't got real XMLHttpRequest object, only some property is available
                    responseURL: resp.finalUrl,
                    status: resp.status,
                    statusText: resp.statusText,
                    responseXML: resp.responseXML,
                    responseText: resp.responseText
                },
            };
            settle(resolve, reject, response);
        };

        if (config.cancelToken) {
            // Handle cancellation
            config.cancelToken.promise.then(function onCanceled(cancel) {
                reject(cancel);
                // Clean up request
            });
        }

        const method = (config.method || 'GET').toUpperCase();
        if (method === "UNLINK" || method === "PURGE" || method === "LINK") {
            reject(createError(`${method} is not a supported method by GM_xmlHttpRequest`, config));
        } else {
            GM_xmlhttpRequest({
                method,
                url: buildURL(buildFullPath(config.baseURL, config.url), config.params, config.paramsSerializer),
                responseType: config.responseType,
                headers: requestHeaders,
                data: requestData,
                timeout: config.timeout,
                ontimeout,
                onload,
                onerror
            });
        }
    });
};
axios.defaults.withCredentials = true;

export default axios
