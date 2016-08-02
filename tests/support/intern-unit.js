// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
	// The port on which the instrumenting proxy will listen
	proxyPort: 9000,

	// A fully qualified URL to the Intern proxy
	proxyUrl: 'http://localhost:9000/',

	// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
	// specified browser environments in the `environments` array below as well. See
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
	// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
	// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
	// automatically
	capabilities: {
		'selenium-version': '2.48.2'
	},
	   // Name of the tunnel class to use for WebDriver tests
   
	// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
	// OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
	// capabilities options specified for an environment will be copied as-is
	environments: [
		{ browserName: 'firefox' }
	],

	// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
	maxConcurrency: 3,

	webdriver: {
		host : '127.0.0.1',
		port : 4444
	},
	coverageVariable:'__internCoverage',
	// The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
	// loader
	
	// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
	// can be used here
	
	loaderOptions: {
		packages: [
			{ name : 'functional' , location : 'functional' },
			{ name : 'unit' , location : 'unit' },
			{ name : 'extensions' , location : '../extensions' },
			{ name : 'chrome' , location : '../../chrome' }
			
		]
  	},
	reporters:[{

		id:'Console'
	},
	{

		id:'LcovHtml',directory:'cov/unit'
	}],	
	// Non-functional test suite(s) to run in each browser
	suites: [  'unit/_index' ],

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(?:tests|node_modules)\//
});
