//-------------------------
// Single Page Apps with HTML5, ASP.NET Web API, Knockout and jQuery
//
// Pluralsight
// John Papa
// http://twitter.com/john_papa
// Course: http://jpapa.me/spaps
// 
// Requirements to run the CodeCamper examples
//
// Live demo: http://jpapa.me/codecamperdemo
//
// License: see codecamper-MIT-LICENSE.txt
//-------------------------

// Notes
//-------------------------
spa-(m2|m3|m4)-xxx.zip contain the code for the demos shown in modules 2-4 of the course.

CodeCamper.zip contains the entire Code Camper application as shown in modules 5-11 of the course.

// Tools
//-------------------------
Visual Studio 2012

// Browser
//-------------------------
Recommended: Chrome, FireFox, Safari, or IE 9 

Debugging:
If using Safari, be sure to enable deugging tools
If using FireFox, be sure to install FireBug


// Extensions and Upates
//-------------------------
NuGet Package Manager
Web Essentials 2012 (supports LESS editing and CSS helpers)


// NuGet Packages
//-------------------------
<packages>
  <package id="dotless" version="1.3.1.0" targetFramework="net45" />
  <package id="EntityFramework" version="5.0.0" targetFramework="net45" />
  <package id="infuser" version="0.2.1" targetFramework="net45" />
  <package id="jQuery" version="1.7.2" targetFramework="net45" />
  <package id="json2" version="1.0.2" targetFramework="net45" />
  <package id="Knockout.js_External_Template_Engine" version="2.0.5" targetFramework="net45" />
  <package id="knockoutjs" version="2.2.0" targetFramework="net45" />
  <package id="KoLite" version="1.0.4" targetFramework="net45" />
  <package id="Microsoft.AspNet.Mvc" version="4.0.20710.0" targetFramework="net45" />
  <package id="Microsoft.AspNet.Providers.Core" version="1.2" targetFramework="net45" />
  <package id="Microsoft.AspNet.Providers.LocalDB" version="1.1" targetFramework="net45" />
  <package id="Microsoft.AspNet.Razor" version="2.0.20715.0" targetFramework="net45" />
  <package id="Microsoft.AspNet.Web.Optimization" version="1.0.0" targetFramework="net45" />
  <package id="Microsoft.AspNet.WebApi" version="4.0.20710.0" targetFramework="net45" />
  <package id="Microsoft.AspNet.WebApi.Client" version="4.0.20710.0" targetFramework="net45" />
  <package id="Microsoft.AspNet.WebApi.Core" version="4.0.20710.0" targetFramework="net45" />
  <package id="Microsoft.AspNet.WebApi.WebHost" version="4.0.20710.0" targetFramework="net45" />
  <package id="Microsoft.AspNet.WebPages" version="2.0.20710.0" targetFramework="net45" />
  <package id="Microsoft.Net.Http" version="2.0.20710.0" targetFramework="net45" />
  <package id="Microsoft.Web.Infrastructure" version="1.0.0.0" targetFramework="net45" />
  <package id="Modernizr" version="2.6.2" targetFramework="net45" />
  <package id="Moment.js" version="1.7.2" targetFramework="net45" />
  <package id="Newtonsoft.Json" version="4.5.11" targetFramework="net45" />
  <package id="Ninject" version="3.0.1.10" targetFramework="net45" />
  <package id="QUnit-MVC" version="1.6.2.0" targetFramework="net45" />
  <package id="RequireJS" version="2.1.1" targetFramework="net45" />
  <package id="Sammy.js" version="0.7.1" targetFramework="net45" />
  <package id="System.Web.Providers.LocalDb" version="1.1" targetFramework="net45" />
  <package id="toastr" version="1.1.1" targetFramework="net45" />
  <package id="TrafficCop" version="0.3.1" targetFramework="net45" />
  <package id="underscore.js" version="1.4.0" targetFramework="net45" />
  <package id="WebGrease" version="1.3.0" targetFramework="net45" />
</packages>




// Optional Tools 
//-------------------------
Electric Mobile Studio 2012 http://www.electricplum.com/studio.aspx
http://jsfiddle.net
http://responsinator.com/



// Tips for Creating a SPA in Visual Studio 
//-------------------------
Create a "New MVC - Web API Project" 

Add NuGet Packages listed above

In Web.config set
<add key="webpages:Enabled" value="true" />

- Set this, otherwise we get "An ASP.NET setting has been detected that does not apply in Integrated managed pipeline mode"
<validation validateIntegratedModeConfiguration="false"/>

- Set this, otherwise you may get a 404 error for PUT and DELETE requests
<system.webServer>
    <validation validateIntegratedModeConfiguration="false" />
    <modules runAllManagedModulesForAllRequests="true" />
</system.webServer>


LESS
- Set cache to false. Otherwise errors don’t always show up. Be sure to turn caching on again later, to get performance.

<dotless minifyCss="false" cache="false" web="false" />



