using System.Web.Optimization;

namespace CodeCamper.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Force optimization to be on or off, regardless of web.config setting
            //BundleTable.EnableOptimizations = false;
            bundles.UseCdn = false;
       
            // .debug.js, -vsdoc.js and .intellisense.js files 
            // are in BundleTable.Bundles.IgnoreList by default.
            // Clear out the list and add back the ones we want to ignore.
            // Don't add back .debug.js.
            //bundles.IgnoreList.Clear();
            //bundles.IgnoreList.Ignore("*-vsdoc.js");
            //bundles.IgnoreList.Ignore("*intellisense.js");

            // Modernizr goes separate since it loads first
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/lib/modernizr-{version}.js"));

            // jQuery
            bundles.Add(new ScriptBundle("~/bundles/jquery", 
                "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js")
                .Include("~/Scripts/lib/jquery-{version}.min.js"));

            // 3rd Party JavaScript files
            bundles.Add(new ScriptBundle("~/bundles/jsextlibs")
                //.IncludeDirectory("~/Scripts/lib", "*.js", searchSubdirectories: false));
                .Include(
                    "~/Scripts/lib/json2.js", // IE7 needs this

                    // jQuery plugins
                    "~/Scripts/lib/activity-indicator.js",
                    "~/Scripts/lib/jquery.mockjson.js",
                    "~/Scripts/lib/TrafficCop.js",
                    "~/Scripts/lib/infuser.js", // depends on TrafficCop

                    // Knockout and its plugins
                    "~/Scripts/lib/knockout-{version}.js",
                    "~/Scripts/lib/knockout.validation.js",
                    "~/Scripts/lib/koExternalTemplateEngine.js",
                    
                    // Other 3rd party libraries
                    "~/Scripts/lib/underscore.js",
                    "~/Scripts/lib/moment.js",
                    "~/Scripts/lib/sammy.*",
                    "~/Scripts/lib/amplify.*",
                    "~/Scripts/lib/toastr.js"
                    ));
            bundles.Add(new ScriptBundle("~/bundles/jsmocks")
                .IncludeDirectory("~/Scripts/app/mock", "*.js", searchSubdirectories: false));

            // All application JS files (except mocks)
            bundles.Add(new ScriptBundle("~/bundles/jsapplibs")
                .IncludeDirectory("~/Scripts/app/", "*.js", searchSubdirectories: false));

            // 3rd Party CSS files
            bundles.Add(new StyleBundle("~/Content/css")
                .Include("~/Content/boilerplate-styles.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/toastr-responsive.css"));

            // Custom LESS files
            bundles.Add(new Bundle("~/Content/Less", new LessTransform(), new CssMinify())
                .Include("~/Content/styles.less"));
        }
    }
}