/**
 * Constants for response status codes from an ajax request.
 */
elements.Model.extend('elements.ResponseStatusCodes',
/* @Static */
{
	OK: 1,
	VALIDATION_ERROR: -1,
	SECURITY_RESTRICTION: -2,
	SYSTEM_ERROR: -3,
	SESSION_EXPIRED: -4,
	CONCURRENT_SESSION_EVICTED: -5,
	NEEDS_AUTHENTICATION: -6,
	RESOURCE_NOT_FOUND: -7,
	UPLOAD_NOT_SUPPORTED: -8,
	STALE_EXCEPTION_IGNORE: -10,
	EXPERIMENT_LOCKED: -11,
	isSuccessfulCode: function(/*int*/ code) {
		return !code || code > 0;
	}
},
/* @Prototype */
{});