// tslint:disable
/**
 * Zuora API Reference
 *   # Introduction Welcome to the reference for the Zuora REST API!  In addition to Zuora API Reference, we also provide API references for other Zuora products:    * [Zuora Collect API Reference](https://www.zuora.com/developer/collect-api/)   * [RevPro API Reference](https://www.zuora.com/developer/revpro-api/)      The Zuora REST API provides a broad set of operations and resources that:    * Enable Web Storefront integration from your website.   * Support self-service subscriber sign-ups and account management.   * Process revenue schedules through custom revenue rule models.   * Enable manipulation of most objects in the Zuora Object Model.  Want to share your opinion on how our API works for you? <a href=\"https://community.zuora.com/t5/Developers/API-Feedback-Form/gpm-p/21399\" target=\"_blank\">Tell us how you feel </a>about using our API and what we can do to make it better.  ## Access to the API  If you have a Zuora tenant, you can access the Zuora REST API via one of the following endpoints:  | Tenant              | Base URL for REST Endpoints | |-------------------------|-------------------------| |US Production | https://rest.zuora.com   | |US API Sandbox    | https://rest.apisandbox.zuora.com| |US Performance Test | https://rest.pt1.zuora.com | |US Production Copy | Submit a request at <a href=\"http://support.zuora.com/\" target=\"_blank\">Zuora Global Support</a> to enable the Zuora REST API in your tenant and obtain the base URL for REST endpoints. See [REST endpoint base URL of Production Copy (Service) Environment for existing and new customers](https://community.zuora.com/t5/API/REST-endpoint-base-URL-of-Production-Copy-Service-Environment/td-p/29611) for more information. | |EU Production | https://rest.eu.zuora.com | |EU Sandbox | https://rest.sandbox.eu.zuora.com |  The Production endpoint provides access to your live user data. API Sandbox tenants are a good place to test code without affecting real-world data. If you would like Zuora to provision an API Sandbox tenant for you, contact your Zuora representative for assistance.   If you do not have a Zuora tenant, go to <a href=\"https://www.zuora.com/resource/zuora-test-drive\" target=\"_blank\">https://www.zuora.com/resource/zuora-test-drive</a> and sign up for a Production Test Drive tenant. The tenant comes with seed data, including a sample product catalog.  # API Changelog You can find the <a href=\"https://community.zuora.com/t5/Developers/API-Changelog/gpm-p/18092\" target=\"_blank\">Changelog</a> of the API Reference in the Zuora Community.  # Authentication  ## OAuth v2.0  Zuora recommends that you use OAuth v2.0 to authenticate to the Zuora REST API. Currently, OAuth is not available in every environment. See [Zuora Testing Environments](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/D_Zuora_Environments) for more information.  Zuora recommends you to create a dedicated API user with API write access on a tenant when authenticating via OAuth, and then create an OAuth client for this user. See <a href=\"https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users/Create_an_API_User\" target=\"_blank\">Create an API User</a> for how to do this. By creating a dedicated API user, you can control permissions of the API user without affecting other non-API users.  If a user is deactivated, all of the user\'s OAuth clients will be automatically deactivated.  Authenticating via OAuth requires the following steps: 1. Create a Client 2. Generate a Token 3. Make Authenticated Requests  ### Create a Client  You must first [create an OAuth client](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users#Create_an_OAuth_Client_for_a_User) in the Zuora UI. To do this, you must be an administrator of your Zuora tenant. This is a one-time operation. You will be provided with a Client ID and a Client Secret. Please note this information down, as it will be required for the next step.  **Note:** The OAuth client will be owned by a Zuora user account. If you want to perform PUT, POST, or DELETE operations using the OAuth client, the owner of the OAuth client must have a Platform role that includes the \"API Write Access\" permission.  ### Generate a Token  After creating a client, you must make a call to obtain a bearer token using the [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) operation. This operation requires the following parameters: - `client_id` - the Client ID displayed when you created the OAuth client in the previous step - `client_secret` - the Client Secret displayed when you created the OAuth client in the previous step - `grant_type` - must be set to `client_credentials`  **Note**: The Client ID and Client Secret mentioned above were displayed when you created the OAuth Client in the prior step. The [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) response specifies how long the bearer token is valid for. You should reuse the bearer token until it is expired. When the token is expired, call [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) again to generate a new one.  ### Make Authenticated Requests  To authenticate subsequent API requests, you must provide a valid bearer token in an HTTP header:  `Authorization: Bearer {bearer_token}`  If you have [Zuora Multi-entity](https://www.zuora.com/developer/api-reference/#tag/Entities) enabled, you need to set an additional header to specify the ID of the entity that you want to access. You can use the `scope` field in the [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) response to determine whether you need to specify an entity ID.  If the `scope` field contains more than one entity ID, you must specify the ID of the entity that you want to access. For example, if the `scope` field contains `entity.1a2b7a37-3e7d-4cb3-b0e2-883de9e766cc` and `entity.c92ed977-510c-4c48-9b51-8d5e848671e9`, specify one of the following headers: - `Zuora-Entity-Ids: 1a2b7a37-3e7d-4cb3-b0e2-883de9e766cc` - `Zuora-Entity-Ids: c92ed977-510c-4c48-9b51-8d5e848671e9`  **Note**: For a limited period of time, Zuora will accept the `entityId` header as an alternative to the `Zuora-Entity-Ids` header. If you choose to set the `entityId` header, you must remove all \"-\" characters from the entity ID in the `scope` field.  If the `scope` field contains a single entity ID, you do not need to specify an entity ID.  ## Other Supported Authentication Schemes  Zuora continues to support the following additional legacy means of authentication:    * Use username and password. Include authentication with each request in the header:         * `apiAccessKeyId`      * `apiSecretAccessKey`          Zuora recommends that you create an API user specifically for making API calls. See <a href=\"https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users/Create_an_API_User\" target=\"_blank\">Create an API User</a> for more information.      * Use an authorization cookie. The cookie authorizes the user to make calls to the REST API for the duration specified in  **Administration > Security Policies > Session timeout**. The cookie expiration time is reset with this duration after every call to the REST API. To obtain a cookie, call the [Connections](https://www.zuora.com/developer/api-reference/#tag/Connections) resource with the following API user information:         *   ID         *   Password        * For CORS-enabled APIs only: Include a \'single-use\' token in the request header, which re-authenticates the user with each request. See below for more details.  ### Entity Id and Entity Name  The `entityId` and `entityName` parameters are only used for [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity \"Zuora Multi-entity\"). These are the legacy parameters that Zuora will only continue to support for a period of time. Zuora recommends you to use the `Zuora-Entity-Ids` parameter instead.   The  `entityId` and `entityName` parameters specify the Id and the [name of the entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/B_Introduction_to_Entity_and_Entity_Hierarchy#Name_and_Display_Name \"Introduction to Entity and Entity Hierarchy\") that you want to access, respectively. Note that you must have permission to access the entity.   You can specify either the `entityId` or `entityName` parameter in the authentication to access and view an entity.    * If both `entityId` and `entityName` are specified in the authentication, an error occurs.    * If neither `entityId` nor `entityName` is specified in the authentication, you will log in to the entity in which your user account is created.      To get the entity Id and entity name, you can use the GET Entities REST call. For more information, see [API User Authentication](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/A_Overview_of_Multi-entity#API_User_Authentication \"API User Authentication\").      ### Token Authentication for CORS-Enabled APIs      The CORS mechanism enables REST API calls to Zuora to be made directly from your customer\'s browser, with all credit card and security information transmitted directly to Zuora. This minimizes your PCI compliance burden, allows you to implement advanced validation on your payment forms, and  makes your payment forms look just like any other part of your website.    For security reasons, instead of using cookies, an API request via CORS uses **tokens** for authentication.  The token method of authentication is only designed for use with requests that must originate from your customer\'s browser; **it should  not be considered a replacement to the existing cookie authentication** mechanism.  See [Zuora CORS REST](https://knowledgecenter.zuora.com/DC_Developers/C_REST_API/Zuora_CORS_REST \"Zuora CORS REST\") for details on how CORS works and how you can begin to implement customer calls to the Zuora REST APIs. See  [HMAC Signatures](https://www.zuora.com/developer/api-reference/#operation/POSTHMACSignature \"HMAC Signatures\") for details on the HMAC method that returns the authentication token.  # Requests and Responses  ## Request IDs  As a general rule, when asked to supply a \"key\" for an account or subscription (accountKey, account-key, subscriptionKey, subscription-key), you can provide either the actual ID or  the number of the entity.  ## HTTP Request Body  Most of the parameters and data accompanying your requests will be contained in the body of the HTTP request.   The Zuora REST API accepts JSON in the HTTP request body. No other data format (e.g., XML) is supported.  ### Data Type  ([Actions](https://www.zuora.com/developer/api-reference/#tag/Actions) and CRUD operations only) We recommend that you do not specify the decimal values with quotation marks, commas, and spaces. Use characters of `+-0-9.eE`, for example, `5`, `1.9`, `-8.469`, and `7.7e2`. Also, Zuora does not convert currencies for decimal values.  ## Testing a Request  Use a third party client, such as [curl](https://curl.haxx.se \"curl\"), [Postman](https://www.getpostman.com \"Postman\"), or [Advanced REST Client](https://advancedrestclient.com \"Advanced REST Client\"), to test the Zuora REST API.  You can test the Zuora REST API from the Zuora API Sandbox or Production tenants. If connecting to Production, bear in mind that you are working with your live production data, not sample data or test data.  ## Testing with Credit Cards  Sooner or later it will probably be necessary to test some transactions that involve credit cards. For suggestions on how to handle this, see [Going Live With Your Payment Gateway](https://knowledgecenter.zuora.com/CB_Billing/M_Payment_Gateways/C_Managing_Payment_Gateways/B_Going_Live_Payment_Gateways#Testing_with_Credit_Cards \"C_Zuora_User_Guides/A_Billing_and_Payments/M_Payment_Gateways/C_Managing_Payment_Gateways/B_Going_Live_Payment_Gateways#Testing_with_Credit_Cards\" ).  ## Concurrent Request Limits  Zuora enforces tenant-level concurrent request limits. See <a href=\"https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Policies/Concurrent_Request_Limits\" target=\"_blank\">Concurrent Request Limits</a> for more information.  ## Timeout Limit  If a request does not complete within 120 seconds, the request times out and Zuora returns a Gateway Timeout error.   # Error Handling  If a request to Zuora Billing REST API with an endpoint starting with `/v1` (except [Actions](https://www.zuora.com/developer/api-reference/#tag/Actions) and CRUD operations) fails, the response will contain an eight-digit error code with a corresponding error message to indicate the details of the error.  The following code snippet is a sample error code and message pair:  ```  \"reasons\":  [ {   \"code\": 53100320,   \"message\": \"\'termType\' value should be one of: TERMED, EVERGREEN\" } ```  The error code begins with `5` or `6` means that you encountered a certain issue that is specific to a REST API resource in Zuora Billing. For example, `53100320` indicates that an invalid value is specified for the `termType` field of the `subscription` object.  The error code beginning with `9` usually indicates that an authentication-related issue occurred, and it can also indicate other unexpected errors depending on different cases. For example, `90000011` indicates that an invalid credential is provided in the request header.   When troubleshooting the error, you can divide the error code into two components: REST API resource code and error category code. See the following Zuora error code sample:  <a href=\"https://assets.zuora.com/zuora-documentation/ZuoraErrorCode.jpeg\" target=\"_blank\"><img src=\"https://assets.zuora.com/zuora-documentation/ZuoraErrorCode.jpeg\" alt=\"Zuora Error Code Sample\"></a>  ## REST API Resource Code  The 6-digit resource code indicates the REST API resource, typically a field of a Zuora object, on which the issue occurs. In the preceding example, `531003` refers to the `termType` field of the `subscription` object.   The value range for all REST API resource codes is from `500000` to `679999`. See [Resource Codes](https://knowledgecenter.zuora.com/Central_Platform/API/AA_REST_API/Resource_Codes) in the Knowledge Center for a full list of resource codes.  ## Error Category Code  The 2-digit error category code identifies the type of error, for example, resource not found or missing required field.   The following table describes all error categories and the corresponding resolution:  | Code    | Error category              | Description    | Resolution    | |:--------|:--------|:--------|:--------| | 10      | Permission or access denied | The request cannot be processed because a certain tenant or user permission is missing. | Check the missing tenant or user permission in the response message and contact [Zuora Global Support](https://support.zuora.com) for enablement. | | 11      | Authentication failed       | Authentication fails due to invalid API authentication credentials. | Ensure that a valid API credential is specified. | | 20      | Invalid format or value     | The request cannot be processed due to an invalid field format or value. | Check the invalid field in the error message, and ensure that the format and value of all fields you passed in are valid. | | 21      | Unknown field in request    | The request cannot be processed because an unknown field exists in the request body. | Check the unknown field name in the response message, and ensure that you do not include any unknown field in the request body. | | 22      | Missing required field      | The request cannot be processed because a required field in the request body is missing. | Check the missing field name in the response message, and ensure that you include all required fields in the request body. | | 30      | Rule restriction            | The request cannot be processed due to the violation of a Zuora business rule. | Check the response message and ensure that the API request meets the specified business rules. | | 40      | Not found                   | The specified resource cannot be found. | Check the response message and ensure that the specified resource exists in your Zuora tenant. | | 45      | Unsupported request         | The requested endpoint does not support the specified HTTP method. | Check your request and ensure that the endpoint and method matches. | | 50      | Locking contention          | This request cannot be processed because the objects this request is trying to modify are being modified by another API request, UI operation, or batch job process. | <p>Resubmit the request first to have another try.</p> <p>If this error still occurs, contact [Zuora Global Support](https://support.zuora.com) with the returned `Zuora-Request-Id` value in the response header for assistance.</p> | | 60      | Internal error              | The server encounters an internal error. | Contact [Zuora Global Support](https://support.zuora.com) with the returned `Zuora-Request-Id` value in the response header for assistance. | | 70      | Request exceeded limit      | The total number of concurrent requests exceeds the limit allowed by the system. | <p>Resubmit the request after the number of seconds specified by the `Retry-After` value in the response header.</p> <p>Check [Concurrent request limits](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Policies/Concurrent_Request_Limits) for details about Zuora’s concurrent request limit policy.</p> | | 90      | Malformed request           | The request cannot be processed due to JSON syntax errors. | Check the syntax error in the JSON request body and ensure that the request is in the correct JSON format. | | 99      | Integration error           | The server encounters an error when communicating with an external system, for example, payment gateway, tax engine provider. | Check the response message and take action accordingly. |   # Pagination  When retrieving information (using GET methods), the optional `pageSize` query parameter sets the maximum number of rows to return in a response. The maximum is `40`; larger values are treated as `40`. If this value is empty or invalid, `pageSize` typically defaults to `10`.  The default value for the maximum number of rows retrieved can be overridden at the method level.  If more rows are available, the response will include a `nextPage` element, which contains a URL for requesting the next page.  If this value is not provided, no more rows are available. No \"previous page\" element is explicitly provided; to support backward paging, use the previous call.  ## Array Size  For data items that are not paginated, the REST API supports arrays of up to 300 rows.  Thus, for instance, repeated pagination can retrieve thousands of customer accounts, but within any account an array of no more than 300 rate plans is returned.  # API Versions  The Zuora REST API are version controlled. Versioning ensures that Zuora REST API changes are backward compatible. Zuora uses a major and minor version nomenclature to manage changes. By specifying a version in a REST request, you can get expected responses regardless of future changes to the API.  ## Major Version  The major version number of the REST API appears in the REST URL. Currently, Zuora only supports the **v1** major version. For example, `POST https://rest.zuora.com/v1/subscriptions`.  ## Minor Version  Zuora uses minor versions for the REST API to control small changes. For example, a field in a REST method is deprecated and a new field is used to replace it.   Some fields in the REST methods are supported as of minor versions. If a field is not noted with a minor version, this field is available for all minor versions. If a field is noted with a minor version, this field is in version control. You must specify the supported minor version in the request header to process without an error.   If a field is in version control, it is either with a minimum minor version or a maximum minor version, or both of them. You can only use this field with the minor version between the minimum and the maximum minor versions. For example, the `invoiceCollect` field in the POST Subscription method is in version control and its maximum minor version is 189.0. You can only use this field with the minor version 189.0 or earlier.  If you specify a version number in the request header that is not supported, Zuora will use the minimum minor version of the REST API. In our REST API documentation, if a field or feature requires a minor version number, we note that in the field description.  You only need to specify the version number when you use the fields require a minor version. To specify the minor version, set the `zuora-version` parameter to the minor version number in the request header for the request call. For example, the `collect` field is in 196.0 minor version. If you want to use this field for the POST Subscription method, set the  `zuora-version` parameter to `196.0` in the request header. The `zuora-version` parameter is case sensitive.  For all the REST API fields, by default, if the minor version is not specified in the request header, Zuora will use the minimum minor version of the REST API to avoid breaking your integration.   ### Minor Version History  The supported minor versions are not serial. This section documents the changes made to each Zuora REST API minor version.  The following table lists the supported versions and the fields that have a Zuora REST API minor version.  | Fields         | Minor Version      | REST Methods    | Description | |:--------|:--------|:--------|:--------| | invoiceCollect | 189.0 and earlier  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Generates an invoice and collects a payment for a subscription. | | collect        | 196.0 and later    | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Collects an automatic payment for a subscription. | | invoice | 196.0 and 207.0| [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Generates an invoice for a subscription. | | invoiceTargetDate | 196.0 and earlier  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\") |Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | invoiceTargetDate | 207.0 and earlier  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | targetDate | 207.0 and later | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\") |Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | targetDate | 211.0 and later | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. | | includeExisting DraftInvoiceItems | 196.0 and earlier| [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | Specifies whether to include draft invoice items in subscription previews. Specify it to be `true` (default) to include draft invoice items in the preview result. Specify it to be `false` to excludes draft invoice items in the preview result. | | includeExisting DraftDocItems | 207.0 and later  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | Specifies whether to include draft invoice items in subscription previews. Specify it to be `true` (default) to include draft invoice items in the preview result. Specify it to be `false` to excludes draft invoice items in the preview result. | | previewType | 196.0 and earlier| [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | The type of preview you will receive. The possible values are `InvoiceItem`(default), `ChargeMetrics`, and `InvoiceItemChargeMetrics`. | | previewType | 207.0 and later  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") | The type of preview you will receive. The possible values are `LegalDoc`(default), `ChargeMetrics`, and `LegalDocChargeMetrics`. | | runBilling  | 211.0 and later  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription \"Create Subscription\"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription \"Renew Subscription\"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription \"Cancel Subscription\"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription \"Suspend Subscription\"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription \"Resume Subscription\"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account \"Create Account\")|Generates an invoice or credit memo for a subscription. **Note:** Credit memos are only available if you have the Invoice Settlement feature enabled. | | invoiceDate | 214.0 and earlier  | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date that should appear on the invoice being generated, as `yyyy-mm-dd`. | | invoiceTargetDate | 214.0 and earlier  | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date through which to calculate charges on this account if an invoice is generated, as `yyyy-mm-dd`. | | documentDate | 215.0 and later | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date that should appear on the invoice and credit memo being generated, as `yyyy-mm-dd`. | | targetDate | 215.0 and later | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment \"Invoice and Collect\") |Date through which to calculate charges on this account if an invoice or a credit memo is generated, as `yyyy-mm-dd`. | | memoItemAmount | 223.0 and earlier | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | Amount of the memo item. | | amount | 224.0 and later | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | Amount of the memo item. | | subscriptionNumbers | 222.4 and earlier | [Create order](https://www.zuora.com/developer/api-reference/#operation/POST_Order \"Create order\") | Container for the subscription numbers of the subscriptions in an order. | | subscriptions | 223.0 and later | [Create order](https://www.zuora.com/developer/api-reference/#operation/POST_Order \"Create order\") | Container for the subscription numbers and statuses in an order. | | creditTaxItems | 238.0 and earlier | [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\") | Container for the taxation items of the credit memo item. | | taxItems | 238.0 and earlier | [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Container for the taxation items of the debit memo item. | | taxationItems | 239.0 and later | [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\"); [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Container for the taxation items of the memo item. | | chargeId | 256.0 and earlier | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | ID of the product rate plan charge that the memo is created from. | | productRatePlanChargeId | 257.0 and later | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\") | ID of the product rate plan charge that the memo is created from. | | comment | 256.0 and earlier | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\"); [Create credit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromInvoice \"Create credit memo from invoice\"); [Create debit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromInvoice \"Create debit memo from invoice\"); [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\"); [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Comments about the product rate plan charge, invoice item, or memo item. | | description | 257.0 and later | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc \"Create credit memo from charge\"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc \"Create debit memo from charge\"); [Create credit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromInvoice \"Create credit memo from invoice\"); [Create debit memo from invoice](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromInvoice \"Create debit memo from invoice\"); [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems \"Get credit memo items\"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem \"Get credit memo item\"); [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems \"Get debit memo items\"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem \"Get debit memo item\") | Description of the the product rate plan charge, invoice item, or memo item. |   #### Version 207.0 and Later  The response structure of the [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview \"Preview Subscription\") and [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription \"Update Subscription\") methods are changed. The following invoice related response fields are moved to the invoice container:    * amount   * amountWithoutTax   * taxAmount   * invoiceItems   * targetDate   * chargeMetrics  # Zuora Object Model  The following diagram presents a high-level view of the key Zuora objects. Click the image to open it in a new tab to resize it.  <a href=\"https://www.zuora.com/wp-content/uploads/2017/01/ZuoraERD.jpeg\" target=\"_blank\"><img src=\"https://www.zuora.com/wp-content/uploads/2017/01/ZuoraERD.jpeg\" alt=\"Zuora Object Model Diagram\"></a>  See the following articles for information about other parts of the Zuora business object model:    * <a href=\"https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/D_Invoice_Settlement_Object_Model\" target=\"_blank\">Invoice Settlement Object Model</a>   * <a href=\"https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/BA_Orders_Object_Model\" target=\"_blank\">Orders Object Model</a>  You can use the [Describe object](https://www.zuora.com/developer/api-reference/#operation/GET_Describe) operation to list the fields of each Zuora object that is available in your tenant. When you call the operation, you must specify the API name of the Zuora object.  The following table provides the API name of each Zuora object:  | Object                                        | API Name                                   | |-----------------------------------------------|--------------------------------------------| | Account                                       | `Account`                                  | | Accounting Code                               | `AccountingCode`                           | | Accounting Period                             | `AccountingPeriod`                         | | Amendment                                     | `Amendment`                                | | Application Group                             | `ApplicationGroup`                         | | Billing Run                                   | <p>`BillingRun` - API name used  in the [Describe object](https://www.zuora.com/developer/api-reference/#operation/GET_Describe) operation, Export ZOQL queries, and Data Query.</p> <p>`BillRun` - API name used in the [Actions](https://www.zuora.com/developer/api-reference/#tag/Actions). See the CRUD oprations of [Bill Run](https://www.zuora.com/developer/api-reference/#tag/Bill-Run) for more information about the `BillRun` object. `BillingRun` and `BillRun` have different fields. | | Contact                                       | `Contact`                                  | | Contact Snapshot                              | `ContactSnapshot`                          | | Credit Balance Adjustment                     | `CreditBalanceAdjustment`                  | | Credit Memo                                   | `CreditMemo`                               | | Credit Memo Application                       | `CreditMemoApplication`                    | | Credit Memo Application Item                  | `CreditMemoApplicationItem`                | | Credit Memo Item                              | `CreditMemoItem`                           | | Credit Memo Part                              | `CreditMemoPart`                           | | Credit Memo Part Item                         | `CreditMemoPartItem`                       | | Credit Taxation Item                          | `CreditTaxationItem`                       | | Custom Exchange Rate                          | `FXCustomRate`                             | | Debit Memo                                    | `DebitMemo`                                | | Debit Memo Item                               | `DebitMemoItem`                            | | Debit Taxation Item                           | `DebitTaxationItem`                        | | Discount Applied Metrics                      | `DiscountAppliedMetrics`                   | | Entity                                        | `Tenant`                                   | | Feature                                       | `Feature`                                  | | Gateway Reconciliation Event                  | `PaymentGatewayReconciliationEventLog`     | | Gateway Reconciliation Job                    | `PaymentReconciliationJob`                 | | Gateway Reconciliation Log                    | `PaymentReconciliationLog`                 | | Invoice                                       | `Invoice`                                  | | Invoice Adjustment                            | `InvoiceAdjustment`                        | | Invoice Item                                  | `InvoiceItem`                              | | Invoice Item Adjustment                       | `InvoiceItemAdjustment`                    | | Invoice Payment                               | `InvoicePayment`                           | | Journal Entry                                 | `JournalEntry`                             | | Journal Entry Item                            | `JournalEntryItem`                         | | Journal Run                                   | `JournalRun`                               | | Order                                         | `Order`                                    | | Order Action                                  | `OrderAction`                              | | Order ELP                                     | `OrderElp`                                 | | Order Item                                    | `OrderItem`                                | | Order MRR                                     | `OrderMrr`                                 | | Order Quantity                                | `OrderQuantity`                            | | Order TCB                                     | `OrderTcb`                                 | | Order TCV                                     | `OrderTcv`                                 | | Payment                                       | `Payment`                                  | | Payment Application                           | `PaymentApplication`                       | | Payment Application Item                      | `PaymentApplicationItem`                   | | Payment Method                                | `PaymentMethod`                            | | Payment Method Snapshot                       | `PaymentMethodSnapshot`                    | | Payment Method Transaction Log                | `PaymentMethodTransactionLog`              | | Payment Method Update                         | `UpdaterDetail`                            | | Payment Part                                  | `PaymentPart`                              | | Payment Part Item                             | `PaymentPartItem`                          | | Payment Run                                   | `PaymentRun`                               | | Payment Transaction Log                       | `PaymentTransactionLog`                    | | Processed Usage                               | `ProcessedUsage`                           | | Product                                       | `Product`                                  | | Product Feature                               | `ProductFeature`                           | | Product Rate Plan                             | `ProductRatePlan`                          | | Product Rate Plan Charge                      | `ProductRatePlanCharge`                    | | Product Rate Plan Charge Tier                 | `ProductRatePlanChargeTier`                | | Rate Plan                                     | `RatePlan`                                 | | Rate Plan Charge                              | `RatePlanCharge`                           | | Rate Plan Charge Tier                         | `RatePlanChargeTier`                       | | Refund                                        | `Refund`                                   | | Refund Application                            | `RefundApplication`                        | | Refund Application Item                       | `RefundApplicationItem`                    | | Refund Invoice Payment                        | `RefundInvoicePayment`                     | | Refund Part                                   | `RefundPart`                               | | Refund Part Item                              | `RefundPartItem`                           | | Refund Transaction Log                        | `RefundTransactionLog`                     | | Revenue Charge Summary                        | `RevenueChargeSummary`                     | | Revenue Charge Summary Item                   | `RevenueChargeSummaryItem`                 | | Revenue Event                                 | `RevenueEvent`                             | | Revenue Event Credit Memo Item                | `RevenueEventCreditMemoItem`               | | Revenue Event Debit Memo Item                 | `RevenueEventDebitMemoItem`                | | Revenue Event Invoice Item                    | `RevenueEventInvoiceItem`                  | | Revenue Event Invoice Item Adjustment         | `RevenueEventInvoiceItemAdjustment`        | | Revenue Event Item                            | `RevenueEventItem`                         | | Revenue Event Item Credit Memo Item           | `RevenueEventItemCreditMemoItem`           | | Revenue Event Item Debit Memo Item            | `RevenueEventItemDebitMemoItem`            | | Revenue Event Item Invoice Item               | `RevenueEventItemInvoiceItem`              | | Revenue Event Item Invoice Item Adjustment    | `RevenueEventItemInvoiceItemAdjustment`    | | Revenue Event Type                            | `RevenueEventType`                         | | Revenue Schedule                              | `RevenueSchedule`                          | | Revenue Schedule Credit Memo Item             | `RevenueScheduleCreditMemoItem`            | | Revenue Schedule Debit Memo Item              | `RevenueScheduleDebitMemoItem`             | | Revenue Schedule Invoice Item                 | `RevenueScheduleInvoiceItem`               | | Revenue Schedule Invoice Item Adjustment      | `RevenueScheduleInvoiceItemAdjustment`     | | Revenue Schedule Item                         | `RevenueScheduleItem`                      | | Revenue Schedule Item Credit Memo Item        | `RevenueScheduleItemCreditMemoItem`        | | Revenue Schedule Item Debit Memo Item         | `RevenueScheduleItemDebitMemoItem`         | | Revenue Schedule Item Invoice Item            | `RevenueScheduleItemInvoiceItem`           | | Revenue Schedule Item Invoice Item Adjustment | `RevenueScheduleItemInvoiceItemAdjustment` | | Subscription                                  | `Subscription`                             | | Subscription Product Feature                  | `SubscriptionProductFeature`               | | Taxable Item Snapshot                         | `TaxableItemSnapshot`                      | | Taxation Item                                 | `TaxationItem`                             | | Updater Batch                                 | `UpdaterBatch`                             | | Usage                                         | `Usage`                                    | 
 *
 * The version of the OpenAPI document: 2020-06-24
 * Contact: docs@zuora.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../../../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../../base';
// @ts-ignore
import { ApplyPaymentType } from '../../../com/zuora/models';
// @ts-ignore
import { CommonResponseType } from '../../../com/zuora/models';
// @ts-ignore
import { CreatePaymentType } from '../../../com/zuora/models';
// @ts-ignore
import { GETARPaymentType } from '../../../com/zuora/models';
// @ts-ignore
import { GETPaymentItemPartCollectionType } from '../../../com/zuora/models';
// @ts-ignore
import { GETPaymentItemPartType } from '../../../com/zuora/models';
// @ts-ignore
import { GETPaymentPartType } from '../../../com/zuora/models';
// @ts-ignore
import { GETPaymentPartsCollectionType } from '../../../com/zuora/models';
// @ts-ignore
import { GETRefundPaymentType } from '../../../com/zuora/models';
// @ts-ignore
import { PaymentCollectionResponseType } from '../../../com/zuora/models';
// @ts-ignore
import { PostRefundType } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyBadRequestResponse } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyCreateOrModifyResponse } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyCreatePayment } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyDeleteResponse } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyGetPayment } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyModifyPayment } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyNoDataResponse } from '../../../com/zuora/models';
// @ts-ignore
import { ProxyUnauthorizedResponse } from '../../../com/zuora/models';
// @ts-ignore
import { TransferPaymentType } from '../../../com/zuora/models';
// @ts-ignore
import { UnapplyPaymentType } from '../../../com/zuora/models';
// @ts-ignore
import { UpdatePaymentType } from '../../../com/zuora/models';
/**
 * PaymentsApi - axios parameter creator
 * @export
 */
export const PaymentsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a payment. Only payments with the Cancelled status can be deleted.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be deleted. 
         * @summary Delete payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dELETEPayment: async (paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling dELETEPayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about one specific payment. 
         * @summary Get payment
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPayment: async (paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling gETPayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about a specific payment part item. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
         * @summary Get payment part item
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} itempartid The unique ID of a specific payment part item. You can get the payment part item ID from the response of [Get payment part items](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentItemParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentItemPart: async (partid: string, itempartid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'partid' is not null or undefined
            if (partid === null || partid === undefined) {
                throw new RequiredError('partid','Required parameter partid was null or undefined when calling gETPaymentItemPart.');
            }
            // verify required parameter 'itempartid' is not null or undefined
            if (itempartid === null || itempartid === undefined) {
                throw new RequiredError('itempartid','Required parameter itempartid was null or undefined when calling gETPaymentItemPart.');
            }
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling gETPaymentItemPart.');
            }
            const localVarPath = `/v1/payments/{paymentId}/parts/{partid}/itemparts/{itempartid}`
                .replace(`{${"partid"}}`, encodeURIComponent(String(partid)))
                .replace(`{${"itempartid"}}`, encodeURIComponent(String(itempartid)))
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a payment part. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
         * @summary Get payment part items
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentItemParts: async (partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'partid' is not null or undefined
            if (partid === null || partid === undefined) {
                throw new RequiredError('partid','Required parameter partid was null or undefined when calling gETPaymentItemParts.');
            }
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling gETPaymentItemParts.');
            }
            const localVarPath = `/v1/payments/{paymentId}/parts/{partid}/itemparts`
                .replace(`{${"partid"}}`, encodeURIComponent(String(partid)))
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific payment part. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. 
         * @summary Get payment part
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentPart: async (partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'partid' is not null or undefined
            if (partid === null || partid === undefined) {
                throw new RequiredError('partid','Required parameter partid was null or undefined when calling gETPaymentPart.');
            }
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling gETPaymentPart.');
            }
            const localVarPath = `/v1/payments/{paymentId}/parts/{partid}`
                .replace(`{${"partid"}}`, encodeURIComponent(String(partid)))
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all parts of a payment. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. You can use this operation to get all the applied and unapplied portions of a payment. 
         * @summary Get payment parts
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentParts: async (paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling gETPaymentParts.');
            }
            const localVarPath = `/v1/payments/{paymentId}/parts`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all payments from all your customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.  Examples:  - /v1/payments?status=Processed  - /v1/payments?currency=USD&status=Processed  - /v1/payments?status=Processed&type=External&sort=+number 
         * @summary Get all payments
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [appliedAmount] This parameter filters the response based on the &#x60;appliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {number} [creditBalanceAmount] This parameter filters the response based on the &#x60;creditBalanceAmount&#x60; field. 
         * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
         * @param {string} [effectiveDate] This parameter filters the response based on the &#x60;effectiveDate&#x60; field. 
         * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
         * @param {number} [refundAmount] This parameter filters the response based on the &#x60;refundAmount&#x60; field. 
         * @param {'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
         * @param {'External' | 'Electronic'} [type] This parameter filters the response based on the &#x60;type&#x60; field. 
         * @param {number} [unappliedAmount] This parameter filters the response based on the &#x60;unappliedAmount&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by payment number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - amount   - appliedAmount   - unappliedAmount   - refundAmount   - creditBalanceAmount   - effectiveDate   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/payments?sort&#x3D;+number  - /v1/payments?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETRetrieveAllPayments: async (zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, appliedAmount?: number, createdById?: string, createdDate?: string, creditBalanceAmount?: number, currency?: string, effectiveDate?: string, number?: string, refundAmount?: number, status?: 'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted', type?: 'External' | 'Electronic', unappliedAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/payments`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (accountId !== undefined) {
                localVarQueryParameter['accountId'] = accountId;
            }

            if (amount !== undefined) {
                localVarQueryParameter['amount'] = amount;
            }

            if (appliedAmount !== undefined) {
                localVarQueryParameter['appliedAmount'] = appliedAmount;
            }

            if (createdById !== undefined) {
                localVarQueryParameter['createdById'] = createdById;
            }

            if (createdDate !== undefined) {
                localVarQueryParameter['createdDate'] = (createdDate as any instanceof Date) ?
                    (createdDate as any).toISOString() :
                    createdDate;
            }

            if (creditBalanceAmount !== undefined) {
                localVarQueryParameter['creditBalanceAmount'] = creditBalanceAmount;
            }

            if (currency !== undefined) {
                localVarQueryParameter['currency'] = currency;
            }

            if (effectiveDate !== undefined) {
                localVarQueryParameter['effectiveDate'] = (effectiveDate as any instanceof Date) ?
                    (effectiveDate as any).toISOString() :
                    effectiveDate;
            }

            if (number !== undefined) {
                localVarQueryParameter['number'] = number;
            }

            if (refundAmount !== undefined) {
                localVarQueryParameter['refundAmount'] = refundAmount;
            }

            if (status !== undefined) {
                localVarQueryParameter['status'] = status;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (unappliedAmount !== undefined) {
                localVarQueryParameter['unappliedAmount'] = unappliedAmount;
            }

            if (updatedById !== undefined) {
                localVarQueryParameter['updatedById'] = updatedById;
            }

            if (updatedDate !== undefined) {
                localVarQueryParameter['updatedDate'] = (updatedDate as any instanceof Date) ?
                    (updatedDate as any).toISOString() :
                    updatedDate;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes a payment. Only payments with the Cancelled status can be deleted.  
         * @summary CRUD: Delete payment
         * @param {string} id The unique ID of the payment to be deleted. For example, 2c92c0f85d4e95ae015d4f7e5d690622. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectDELETEPayment: async (id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling objectDELETEPayment.');
            }
            const localVarPath = `/v1/object/payment/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves the information about one specific payment.  
         * @summary CRUD: Get payment
         * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectGETPayment: async (id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling objectGETPayment.');
            }
            const localVarPath = `/v1/object/payment/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a payment.  **Note:** If you have the Invoice Settlement feature enabled, you cannot use this operation to create a payment. 
         * @summary CRUD: Create payment
         * @param {ProxyCreatePayment} createRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectPOSTPayment: async (createRequest: ProxyCreatePayment, zuoraEntityIds?: string, zuoraTrackId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'createRequest' is not null or undefined
            if (createRequest === null || createRequest === undefined) {
                throw new RequiredError('createRequest','Required parameter createRequest was null or undefined when calling objectPOSTPayment.');
            }
            const localVarPath = `/v1/object/payment`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof createRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(createRequest !== undefined ? createRequest : {}) : (createRequest || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a payment.  
         * @summary CRUD: Update payment
         * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
         * @param {ProxyModifyPayment} modifyRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectPUTPayment: async (id: string, modifyRequest: ProxyModifyPayment, zuoraEntityIds?: string, zuoraTrackId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling objectPUTPayment.');
            }
            // verify required parameter 'modifyRequest' is not null or undefined
            if (modifyRequest === null || modifyRequest === undefined) {
                throw new RequiredError('modifyRequest','Required parameter modifyRequest was null or undefined when calling objectPUTPayment.');
            }
            const localVarPath = `/v1/object/payment/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof modifyRequest !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(modifyRequest !== undefined ? modifyRequest : {}) : (modifyRequest || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates a payment for the following scenarios:  - A full payment on an invoice or debit memo - A partial payment - A payment for several invoices and debit memos - An unapplied payment   If you do not know to which customer account the payment belongs, you can create a payment without specifying a customer account.  When creating a payment, the total number of invoices and debit memos that the payment will apply to should be less than or equal to 1,000.  If the Proration application rule is used, when creating a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.  For more information, see [Create Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments) and [Create Payments Without Specifying Customer Accounts](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments_Without_Specifying_Customer_Accounts).      
         * @summary Create payment
         * @param {CreatePaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTCreatePayment: async (body: CreatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pOSTCreatePayment.');
            }
            const localVarPath = `/v1/payments`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Refunds a full or partial unapplied payment to your customers. To refund applied payments, you must unapply the applied payments from the invoices or debit memos, and then refund the unapplied payments to customers.  For more information, see [Refund Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Z_Refund_Payments). 
         * @summary Refund payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {PostRefundType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTRefundPayment: async (paymentId: string, body: PostRefundType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling pOSTRefundPayment.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pOSTRefundPayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}/refunds`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Applies an unapplied payment to invoices and debit memos.  When applying a payment, the total number of invoices and debit memos that the payment will apply to must be less than or equal to 1,000.  If the Proration application rule is used, when applying a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.   For more information, see [Apply Unapplied Payments to Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Apply_Unapplied_Payments_to_Invoices_and_Debit_Memos). 
         * @summary Apply payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {ApplyPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTApplyPayment: async (paymentId: string, body: ApplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling pUTApplyPayment.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pUTApplyPayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}/apply`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a payment.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be cancelled. 
         * @summary Cancel payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTCancelPayment: async (paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling pUTCancelPayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}/cancel`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Transfers an unapplied payment.  For more information, see [Transfer Unapplied Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Transfer_Unapplied_Payments). 
         * @summary Transfer payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {TransferPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTTransferPayment: async (paymentId: string, body: TransferPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling pUTTransferPayment.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pUTTransferPayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}/transfer`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unapplies an applied payment from invoices and debit memos.  For more information, see [Unapply Payments from Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Unapply_Payments_from_Invoices_and_Debit_Memos). 
         * @summary Unapply payment
         * @param {string} paymentId The unique ID of an applied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {UnapplyPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUnapplyPayment: async (paymentId: string, body: UnapplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling pUTUnapplyPayment.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pUTUnapplyPayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}/unapply`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates a payment. 
         * @summary Update payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {UpdatePaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUpdatePayment: async (paymentId: string, body: UpdatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'paymentId' is not null or undefined
            if (paymentId === null || paymentId === undefined) {
                throw new RequiredError('paymentId','Required parameter paymentId was null or undefined when calling pUTUpdatePayment.');
            }
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling pUTUpdatePayment.');
            }
            const localVarPath = `/v1/payments/{paymentId}`
                .replace(`{${"paymentId"}}`, encodeURIComponent(String(paymentId)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (zuoraTrackId !== undefined && zuoraTrackId !== null) {
                localVarHeaderParameter['Zuora-Track-Id'] = String(zuoraTrackId);
            }

            if (zuoraEntityIds !== undefined && zuoraEntityIds !== null) {
                localVarHeaderParameter['Zuora-Entity-Ids'] = String(zuoraEntityIds);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json; charset=utf-8';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PaymentsApi - functional programming interface
 * @export
 */
export const PaymentsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a payment. Only payments with the Cancelled status can be deleted.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be deleted. 
         * @summary Delete payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async dELETEPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CommonResponseType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).dELETEPayment(paymentId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about one specific payment. 
         * @summary Get payment
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETARPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).gETPayment(paymentId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about a specific payment part item. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
         * @summary Get payment part item
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} itempartid The unique ID of a specific payment part item. You can get the payment part item ID from the response of [Get payment part items](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentItemParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETPaymentItemPart(partid: string, itempartid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETPaymentItemPartType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).gETPaymentItemPart(partid, itempartid, paymentId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a payment part. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
         * @summary Get payment part items
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETPaymentItemParts(partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETPaymentItemPartCollectionType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).gETPaymentItemParts(partid, paymentId, zuoraTrackId, zuoraEntityIds, pageSize, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific payment part. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. 
         * @summary Get payment part
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETPaymentPart(partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETPaymentPartType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).gETPaymentPart(partid, paymentId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all parts of a payment. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. You can use this operation to get all the applied and unapplied portions of a payment. 
         * @summary Get payment parts
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETPaymentParts(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETPaymentPartsCollectionType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).gETPaymentParts(paymentId, zuoraTrackId, zuoraEntityIds, pageSize, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all payments from all your customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.  Examples:  - /v1/payments?status=Processed  - /v1/payments?currency=USD&status=Processed  - /v1/payments?status=Processed&type=External&sort=+number 
         * @summary Get all payments
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [appliedAmount] This parameter filters the response based on the &#x60;appliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {number} [creditBalanceAmount] This parameter filters the response based on the &#x60;creditBalanceAmount&#x60; field. 
         * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
         * @param {string} [effectiveDate] This parameter filters the response based on the &#x60;effectiveDate&#x60; field. 
         * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
         * @param {number} [refundAmount] This parameter filters the response based on the &#x60;refundAmount&#x60; field. 
         * @param {'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
         * @param {'External' | 'Electronic'} [type] This parameter filters the response based on the &#x60;type&#x60; field. 
         * @param {number} [unappliedAmount] This parameter filters the response based on the &#x60;unappliedAmount&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by payment number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - amount   - appliedAmount   - unappliedAmount   - refundAmount   - creditBalanceAmount   - effectiveDate   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/payments?sort&#x3D;+number  - /v1/payments?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gETRetrieveAllPayments(zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, appliedAmount?: number, createdById?: string, createdDate?: string, creditBalanceAmount?: number, currency?: string, effectiveDate?: string, number?: string, refundAmount?: number, status?: 'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted', type?: 'External' | 'Electronic', unappliedAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentCollectionResponseType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).gETRetrieveAllPayments(zuoraTrackId, zuoraEntityIds, pageSize, accountId, amount, appliedAmount, createdById, createdDate, creditBalanceAmount, currency, effectiveDate, number, refundAmount, status, type, unappliedAmount, updatedById, updatedDate, sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Deletes a payment. Only payments with the Cancelled status can be deleted.  
         * @summary CRUD: Delete payment
         * @param {string} id The unique ID of the payment to be deleted. For example, 2c92c0f85d4e95ae015d4f7e5d690622. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async objectDELETEPayment(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProxyDeleteResponse>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).objectDELETEPayment(id, zuoraEntityIds, zuoraTrackId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieves the information about one specific payment.  
         * @summary CRUD: Get payment
         * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async objectGETPayment(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProxyGetPayment>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).objectGETPayment(id, zuoraEntityIds, zuoraTrackId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Creates a payment.  **Note:** If you have the Invoice Settlement feature enabled, you cannot use this operation to create a payment. 
         * @summary CRUD: Create payment
         * @param {ProxyCreatePayment} createRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async objectPOSTPayment(createRequest: ProxyCreatePayment, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProxyCreateOrModifyResponse>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).objectPOSTPayment(createRequest, zuoraEntityIds, zuoraTrackId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Updates a payment.  
         * @summary CRUD: Update payment
         * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
         * @param {ProxyModifyPayment} modifyRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async objectPUTPayment(id: string, modifyRequest: ProxyModifyPayment, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProxyCreateOrModifyResponse>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).objectPUTPayment(id, modifyRequest, zuoraEntityIds, zuoraTrackId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates a payment for the following scenarios:  - A full payment on an invoice or debit memo - A partial payment - A payment for several invoices and debit memos - An unapplied payment   If you do not know to which customer account the payment belongs, you can create a payment without specifying a customer account.  When creating a payment, the total number of invoices and debit memos that the payment will apply to should be less than or equal to 1,000.  If the Proration application rule is used, when creating a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.  For more information, see [Create Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments) and [Create Payments Without Specifying Customer Accounts](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments_Without_Specifying_Customer_Accounts).      
         * @summary Create payment
         * @param {CreatePaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTCreatePayment(body: CreatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETARPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).pOSTCreatePayment(body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Refunds a full or partial unapplied payment to your customers. To refund applied payments, you must unapply the applied payments from the invoices or debit memos, and then refund the unapplied payments to customers.  For more information, see [Refund Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Z_Refund_Payments). 
         * @summary Refund payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {PostRefundType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pOSTRefundPayment(paymentId: string, body: PostRefundType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETRefundPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).pOSTRefundPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Applies an unapplied payment to invoices and debit memos.  When applying a payment, the total number of invoices and debit memos that the payment will apply to must be less than or equal to 1,000.  If the Proration application rule is used, when applying a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.   For more information, see [Apply Unapplied Payments to Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Apply_Unapplied_Payments_to_Invoices_and_Debit_Memos). 
         * @summary Apply payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {ApplyPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTApplyPayment(paymentId: string, body: ApplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETARPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).pUTApplyPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a payment.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be cancelled. 
         * @summary Cancel payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTCancelPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETARPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).pUTCancelPayment(paymentId, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Transfers an unapplied payment.  For more information, see [Transfer Unapplied Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Transfer_Unapplied_Payments). 
         * @summary Transfer payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {TransferPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTTransferPayment(paymentId: string, body: TransferPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETARPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).pUTTransferPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unapplies an applied payment from invoices and debit memos.  For more information, see [Unapply Payments from Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Unapply_Payments_from_Invoices_and_Debit_Memos). 
         * @summary Unapply payment
         * @param {string} paymentId The unique ID of an applied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {UnapplyPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTUnapplyPayment(paymentId: string, body: UnapplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETARPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).pUTUnapplyPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates a payment. 
         * @summary Update payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {UpdatePaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pUTUpdatePayment(paymentId: string, body: UpdatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GETARPaymentType>> {
            const localVarAxiosArgs = await PaymentsApiAxiosParamCreator(configuration).pUTUpdatePayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PaymentsApi - factory interface
 * @export
 */
export const PaymentsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a payment. Only payments with the Cancelled status can be deleted.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be deleted. 
         * @summary Delete payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dELETEPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<CommonResponseType> {
            return PaymentsApiFp(configuration).dELETEPayment(paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about one specific payment. 
         * @summary Get payment
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETARPaymentType> {
            return PaymentsApiFp(configuration).gETPayment(paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about a specific payment part item. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
         * @summary Get payment part item
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} itempartid The unique ID of a specific payment part item. You can get the payment part item ID from the response of [Get payment part items](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentItemParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentItemPart(partid: string, itempartid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETPaymentItemPartType> {
            return PaymentsApiFp(configuration).gETPaymentItemPart(partid, itempartid, paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a payment part. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
         * @summary Get payment part items
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentItemParts(partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): AxiosPromise<GETPaymentItemPartCollectionType> {
            return PaymentsApiFp(configuration).gETPaymentItemParts(partid, paymentId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific payment part. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. 
         * @summary Get payment part
         * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentPart(partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETPaymentPartType> {
            return PaymentsApiFp(configuration).gETPaymentPart(partid, paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all parts of a payment. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. You can use this operation to get all the applied and unapplied portions of a payment. 
         * @summary Get payment parts
         * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETPaymentParts(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any): AxiosPromise<GETPaymentPartsCollectionType> {
            return PaymentsApiFp(configuration).gETPaymentParts(paymentId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all payments from all your customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.  Examples:  - /v1/payments?status=Processed  - /v1/payments?currency=USD&status=Processed  - /v1/payments?status=Processed&type=External&sort=+number 
         * @summary Get all payments
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {number} [pageSize] Number of rows returned per page. 
         * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
         * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
         * @param {number} [appliedAmount] This parameter filters the response based on the &#x60;appliedAmount&#x60; field. 
         * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
         * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
         * @param {number} [creditBalanceAmount] This parameter filters the response based on the &#x60;creditBalanceAmount&#x60; field. 
         * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
         * @param {string} [effectiveDate] This parameter filters the response based on the &#x60;effectiveDate&#x60; field. 
         * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
         * @param {number} [refundAmount] This parameter filters the response based on the &#x60;refundAmount&#x60; field. 
         * @param {'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
         * @param {'External' | 'Electronic'} [type] This parameter filters the response based on the &#x60;type&#x60; field. 
         * @param {number} [unappliedAmount] This parameter filters the response based on the &#x60;unappliedAmount&#x60; field. 
         * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
         * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
         * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by payment number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - amount   - appliedAmount   - unappliedAmount   - refundAmount   - creditBalanceAmount   - effectiveDate   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/payments?sort&#x3D;+number  - /v1/payments?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gETRetrieveAllPayments(zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, appliedAmount?: number, createdById?: string, createdDate?: string, creditBalanceAmount?: number, currency?: string, effectiveDate?: string, number?: string, refundAmount?: number, status?: 'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted', type?: 'External' | 'Electronic', unappliedAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options?: any): AxiosPromise<PaymentCollectionResponseType> {
            return PaymentsApiFp(configuration).gETRetrieveAllPayments(zuoraTrackId, zuoraEntityIds, pageSize, accountId, amount, appliedAmount, createdById, createdDate, creditBalanceAmount, currency, effectiveDate, number, refundAmount, status, type, unappliedAmount, updatedById, updatedDate, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes a payment. Only payments with the Cancelled status can be deleted.  
         * @summary CRUD: Delete payment
         * @param {string} id The unique ID of the payment to be deleted. For example, 2c92c0f85d4e95ae015d4f7e5d690622. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectDELETEPayment(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): AxiosPromise<ProxyDeleteResponse> {
            return PaymentsApiFp(configuration).objectDELETEPayment(id, zuoraEntityIds, zuoraTrackId, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the information about one specific payment.  
         * @summary CRUD: Get payment
         * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectGETPayment(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): AxiosPromise<ProxyGetPayment> {
            return PaymentsApiFp(configuration).objectGETPayment(id, zuoraEntityIds, zuoraTrackId, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a payment.  **Note:** If you have the Invoice Settlement feature enabled, you cannot use this operation to create a payment. 
         * @summary CRUD: Create payment
         * @param {ProxyCreatePayment} createRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectPOSTPayment(createRequest: ProxyCreatePayment, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): AxiosPromise<ProxyCreateOrModifyResponse> {
            return PaymentsApiFp(configuration).objectPOSTPayment(createRequest, zuoraEntityIds, zuoraTrackId, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a payment.  
         * @summary CRUD: Update payment
         * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
         * @param {ProxyModifyPayment} modifyRequest 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        objectPUTPayment(id: string, modifyRequest: ProxyModifyPayment, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any): AxiosPromise<ProxyCreateOrModifyResponse> {
            return PaymentsApiFp(configuration).objectPUTPayment(id, modifyRequest, zuoraEntityIds, zuoraTrackId, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates a payment for the following scenarios:  - A full payment on an invoice or debit memo - A partial payment - A payment for several invoices and debit memos - An unapplied payment   If you do not know to which customer account the payment belongs, you can create a payment without specifying a customer account.  When creating a payment, the total number of invoices and debit memos that the payment will apply to should be less than or equal to 1,000.  If the Proration application rule is used, when creating a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.  For more information, see [Create Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments) and [Create Payments Without Specifying Customer Accounts](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments_Without_Specifying_Customer_Accounts).      
         * @summary Create payment
         * @param {CreatePaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTCreatePayment(body: CreatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETARPaymentType> {
            return PaymentsApiFp(configuration).pOSTCreatePayment(body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Refunds a full or partial unapplied payment to your customers. To refund applied payments, you must unapply the applied payments from the invoices or debit memos, and then refund the unapplied payments to customers.  For more information, see [Refund Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Z_Refund_Payments). 
         * @summary Refund payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {PostRefundType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pOSTRefundPayment(paymentId: string, body: PostRefundType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETRefundPaymentType> {
            return PaymentsApiFp(configuration).pOSTRefundPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Applies an unapplied payment to invoices and debit memos.  When applying a payment, the total number of invoices and debit memos that the payment will apply to must be less than or equal to 1,000.  If the Proration application rule is used, when applying a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.   For more information, see [Apply Unapplied Payments to Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Apply_Unapplied_Payments_to_Invoices_and_Debit_Memos). 
         * @summary Apply payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {ApplyPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTApplyPayment(paymentId: string, body: ApplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETARPaymentType> {
            return PaymentsApiFp(configuration).pUTApplyPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a payment.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be cancelled. 
         * @summary Cancel payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTCancelPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETARPaymentType> {
            return PaymentsApiFp(configuration).pUTCancelPayment(paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Transfers an unapplied payment.  For more information, see [Transfer Unapplied Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Transfer_Unapplied_Payments). 
         * @summary Transfer payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {TransferPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTTransferPayment(paymentId: string, body: TransferPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETARPaymentType> {
            return PaymentsApiFp(configuration).pUTTransferPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unapplies an applied payment from invoices and debit memos.  For more information, see [Unapply Payments from Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Unapply_Payments_from_Invoices_and_Debit_Memos). 
         * @summary Unapply payment
         * @param {string} paymentId The unique ID of an applied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {UnapplyPaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUnapplyPayment(paymentId: string, body: UnapplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETARPaymentType> {
            return PaymentsApiFp(configuration).pUTUnapplyPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
        /**
         * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates a payment. 
         * @summary Update payment
         * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
         * @param {UpdatePaymentType} body 
         * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
         * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pUTUpdatePayment(paymentId: string, body: UpdatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any): AxiosPromise<GETARPaymentType> {
            return PaymentsApiFp(configuration).pUTUpdatePayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PaymentsApi - object-oriented interface
 * @export
 * @class PaymentsApi
 * @extends {BaseAPI}
 */
export class PaymentsApi extends BaseAPI {
    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Deletes a payment. Only payments with the Cancelled status can be deleted.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be deleted. 
     * @summary Delete payment
     * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public dELETEPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).dELETEPayment(paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about one specific payment. 
     * @summary Get payment
     * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public gETPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).gETPayment(paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).  Retrieves the information about a specific payment part item. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
     * @summary Get payment part item
     * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
     * @param {string} itempartid The unique ID of a specific payment part item. You can get the payment part item ID from the response of [Get payment part items](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentItemParts). 
     * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public gETPaymentItemPart(partid: string, itempartid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).gETPaymentItemPart(partid, itempartid, paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all items of a payment part. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items. 
     * @summary Get payment part items
     * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
     * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public gETPaymentItemParts(partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any) {
        return PaymentsApiFp(this.configuration).gETPaymentItemParts(partid, paymentId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about a specific payment part. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. 
     * @summary Get payment part
     * @param {string} partid The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts). 
     * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public gETPaymentPart(partid: string, paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).gETPaymentPart(partid, paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all parts of a payment. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. You can use this operation to get all the applied and unapplied portions of a payment. 
     * @summary Get payment parts
     * @param {string} paymentId The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public gETPaymentParts(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, options?: any) {
        return PaymentsApiFp(this.configuration).gETPaymentParts(paymentId, zuoraTrackId, zuoraEntityIds, pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Retrieves the information about all payments from all your customer accounts.  ### Filtering  You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.  If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.  Examples:  - /v1/payments?status=Processed  - /v1/payments?currency=USD&status=Processed  - /v1/payments?status=Processed&type=External&sort=+number 
     * @summary Get all payments
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {number} [pageSize] Number of rows returned per page. 
     * @param {string} [accountId] This parameter filters the response based on the &#x60;accountId&#x60; field. 
     * @param {number} [amount] This parameter filters the response based on the &#x60;amount&#x60; field. 
     * @param {number} [appliedAmount] This parameter filters the response based on the &#x60;appliedAmount&#x60; field. 
     * @param {string} [createdById] This parameter filters the response based on the &#x60;createdById&#x60; field. 
     * @param {string} [createdDate] This parameter filters the response based on the &#x60;createdDate&#x60; field. 
     * @param {number} [creditBalanceAmount] This parameter filters the response based on the &#x60;creditBalanceAmount&#x60; field. 
     * @param {string} [currency] This parameter filters the response based on the &#x60;currency&#x60; field. 
     * @param {string} [effectiveDate] This parameter filters the response based on the &#x60;effectiveDate&#x60; field. 
     * @param {string} [number] This parameter filters the response based on the &#x60;number&#x60; field. 
     * @param {number} [refundAmount] This parameter filters the response based on the &#x60;refundAmount&#x60; field. 
     * @param {'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted'} [status] This parameter filters the response based on the &#x60;status&#x60; field. 
     * @param {'External' | 'Electronic'} [type] This parameter filters the response based on the &#x60;type&#x60; field. 
     * @param {number} [unappliedAmount] This parameter filters the response based on the &#x60;unappliedAmount&#x60; field. 
     * @param {string} [updatedById] This parameter filters the response based on the &#x60;updatedById&#x60; field. 
     * @param {string} [updatedDate] This parameter filters the response based on the &#x60;updatedDate&#x60; field. 
     * @param {string} [sort] This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.  A sortable field uses the following form:   *operator* *field_name*  You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*    *operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.    - The &#x60;-&#x60; operator indicates an ascending order.   - The &#x60;+&#x60; operator indicates a descending order.  By default, the response data is displayed in descending order by payment number.  *field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:    - number   - accountId   - amount   - appliedAmount   - unappliedAmount   - refundAmount   - creditBalanceAmount   - effectiveDate   - createdDate   - createdById   - updatedDate   - updatedById    Examples:  - /v1/payments?sort&#x3D;+number  - /v1/payments?status&#x3D;Processed&amp;sort&#x3D;-number,+amount 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public gETRetrieveAllPayments(zuoraTrackId?: string, zuoraEntityIds?: string, pageSize?: number, accountId?: string, amount?: number, appliedAmount?: number, createdById?: string, createdDate?: string, creditBalanceAmount?: number, currency?: string, effectiveDate?: string, number?: string, refundAmount?: number, status?: 'Draft' | 'Processing' | 'Processed' | 'Error' | 'Canceled' | 'Posted', type?: 'External' | 'Electronic', unappliedAmount?: number, updatedById?: string, updatedDate?: string, sort?: string, options?: any) {
        return PaymentsApiFp(this.configuration).gETRetrieveAllPayments(zuoraTrackId, zuoraEntityIds, pageSize, accountId, amount, appliedAmount, createdById, createdDate, creditBalanceAmount, currency, effectiveDate, number, refundAmount, status, type, unappliedAmount, updatedById, updatedDate, sort, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deletes a payment. Only payments with the Cancelled status can be deleted.  
     * @summary CRUD: Delete payment
     * @param {string} id The unique ID of the payment to be deleted. For example, 2c92c0f85d4e95ae015d4f7e5d690622. 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public objectDELETEPayment(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any) {
        return PaymentsApiFp(this.configuration).objectDELETEPayment(id, zuoraEntityIds, zuoraTrackId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the information about one specific payment.  
     * @summary CRUD: Get payment
     * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public objectGETPayment(id: string, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any) {
        return PaymentsApiFp(this.configuration).objectGETPayment(id, zuoraEntityIds, zuoraTrackId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a payment.  **Note:** If you have the Invoice Settlement feature enabled, you cannot use this operation to create a payment. 
     * @summary CRUD: Create payment
     * @param {ProxyCreatePayment} createRequest 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public objectPOSTPayment(createRequest: ProxyCreatePayment, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any) {
        return PaymentsApiFp(this.configuration).objectPOSTPayment(createRequest, zuoraEntityIds, zuoraTrackId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates a payment.  
     * @summary CRUD: Update payment
     * @param {string} id The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352. 
     * @param {ProxyModifyPayment} modifyRequest 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public objectPUTPayment(id: string, modifyRequest: ProxyModifyPayment, zuoraEntityIds?: string, zuoraTrackId?: string, options?: any) {
        return PaymentsApiFp(this.configuration).objectPUTPayment(id, modifyRequest, zuoraEntityIds, zuoraTrackId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Creates a payment for the following scenarios:  - A full payment on an invoice or debit memo - A partial payment - A payment for several invoices and debit memos - An unapplied payment   If you do not know to which customer account the payment belongs, you can create a payment without specifying a customer account.  When creating a payment, the total number of invoices and debit memos that the payment will apply to should be less than or equal to 1,000.  If the Proration application rule is used, when creating a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.  For more information, see [Create Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments) and [Create Payments Without Specifying Customer Accounts](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments_Without_Specifying_Customer_Accounts).      
     * @summary Create payment
     * @param {CreatePaymentType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public pOSTCreatePayment(body: CreatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).pOSTCreatePayment(body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Refunds a full or partial unapplied payment to your customers. To refund applied payments, you must unapply the applied payments from the invoices or debit memos, and then refund the unapplied payments to customers.  For more information, see [Refund Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Z_Refund_Payments). 
     * @summary Refund payment
     * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {PostRefundType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public pOSTRefundPayment(paymentId: string, body: PostRefundType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).pOSTRefundPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Applies an unapplied payment to invoices and debit memos.  When applying a payment, the total number of invoices and debit memos that the payment will apply to must be less than or equal to 1,000.  If the Proration application rule is used, when applying a payment, the following quantity must be less than or equal to 10,000:   (number of invoice items + number of debit memo items) * number of payment items  Otherwise, the First In First Out rule will be used instead of the Proration rule.   For more information, see [Apply Unapplied Payments to Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Apply_Unapplied_Payments_to_Invoices_and_Debit_Memos). 
     * @summary Apply payment
     * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {ApplyPaymentType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public pUTApplyPayment(paymentId: string, body: ApplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).pUTApplyPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Cancels a payment.   If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be cancelled. 
     * @summary Cancel payment
     * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public pUTCancelPayment(paymentId: string, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).pUTCancelPayment(paymentId, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Transfers an unapplied payment.  For more information, see [Transfer Unapplied Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Transfer_Unapplied_Payments). 
     * @summary Transfer payment
     * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {TransferPaymentType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public pUTTransferPayment(paymentId: string, body: TransferPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).pUTTransferPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Unapplies an applied payment from invoices and debit memos.  For more information, see [Unapply Payments from Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Unapply_Payments_from_Invoices_and_Debit_Memos). 
     * @summary Unapply payment
     * @param {string} paymentId The unique ID of an applied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {UnapplyPaymentType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public pUTUnapplyPayment(paymentId: string, body: UnapplyPaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).pUTUnapplyPayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).   Updates a payment. 
     * @summary Update payment
     * @param {string} paymentId The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1. 
     * @param {UpdatePaymentType} body 
     * @param {string} [zuoraTrackId] A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.  The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (&#x60;:&#x60;), semicolon (&#x60;;&#x60;), double quote (&#x60;\&quot;&#x60;), and quote (&#x60;\&#39;&#x60;). 
     * @param {string} [zuoraEntityIds] An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header. 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentsApi
     */
    public pUTUpdatePayment(paymentId: string, body: UpdatePaymentType, zuoraTrackId?: string, zuoraEntityIds?: string, options?: any) {
        return PaymentsApiFp(this.configuration).pUTUpdatePayment(paymentId, body, zuoraTrackId, zuoraEntityIds, options).then((request) => request(this.axios, this.basePath));
    }

}
