1. fetching through api calls and doing Promise.all
arr.push(fetch("API_ENDPOINT").then(res)=>res.json())
let jobDetails = await Promise.all(arr);


2. <a href={url} target={_blank} rel={"noopener noreferrer"} />
noopener:
When you use target="_blank" to open a link in a new tab, the new page can potentially access the window.opener object, which could pose a security risk. This might allow the new page to redirect the original page to a malicious URL.
rel="noopener" prevents the new page from being able to access the window.opener property, thus mitigating this security risk.

noreferrer:
It prevents the browser from sending the HTTP Referer (sic) header to the destination page. The Referer header contains the URL of the page that is linking to the new page, which can be used for tracking or analytics purposes.


Using both noopener and noreferrer is a common practice to ensure security and privacy when opening links in a new tab. The combination helps protect against potential security vulnerabilities and prevents the destination site from knowing that your page linked to it.