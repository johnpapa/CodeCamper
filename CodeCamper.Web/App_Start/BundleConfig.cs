using System.Web.Optimization;

namespace CodeCamper.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Force optimization to be on or off, regardless of web.config setting
            BundleTable.EnableOptimizations = true;
       
            // .debug.js, -vsdoc.js and .intellisense.js files 
            // are in BundleTable.Bundles.IgnoreList by default.
            // Clear out the list and add back the ones we want to ignore.
            // Don't add back .debug.js.
            bundles.IgnoreList.Clear();
            bundles.IgnoreList.Ignore("*-vsdoc.js");
            bundles.IgnoreList.Ignore("*intellisense.js");

            // Modernizr goes separate since its a shiv
            bundles.Add(new ScriptBundle("~/jsbundles/modernizr")
                .Include("~/Scripts/lib/modernizr-*"));

            // 3rd Party JavaScript files
            bundles.Add(new ScriptBundle("~/jsbundles/extlibs")
                .Include(
                    "~/Scripts/lib/json2.min.js", // IE7 needs this

                    // jQuery and its plugins
                    "~/Scripts/lib/jquery-1.7.2.min.js", // Wildcard used so we get latest jquery
                    "~/Scripts/lib/activity-indicator.js",
                    "~/Scripts/lib/jquery.mockjson.js",
                    "~/Scripts/lib/jquery-ui.min.js",
                    "~/Scripts/lib/jquery.wijmo-open.all.2.1.2.min.js", // depends on jquery-ui
                    "~/Scripts/lib/TrafficCop.js",
                    "~/Scripts/lib/infuser.js", // depends on TrafficCop

                    // Knockout and its plugins
                    //"~/Scripts/lib/knockout-2.1.0.js",
                    "~/Scripts/lib/knockout-2.1.0.debug.js",  
                    "~/Scripts/lib/knockout.validation.js",
                    "~/Scripts/lib/knockout.wijmo.js", // depends on jquery-ui and ko
                    "~/Scripts/lib/koExternalTemplateEngine.js",

                    "~/Scripts/lib/underscore.min.js",
                    "~/Scripts/lib/moment.js",

                    "~/Scripts/lib/sammy.js",
                    "~/Scripts/lib/sammy.title.js",

                    "~/Scripts/lib/amplify.core.js",
                    "~/Scripts/lib/amplify.request.js",
                    "~/Scripts/lib/amplify.store.js",
                    
                    "~/Scripts/lib/toastr.js"
                    ));

            // 3rd Party CSS files
            bundles.Add(new StyleBundle("~/Content/css")
                .Include(
                        "~/Content/jquery.wijmo-*",
                        "~/Content/toastr.css",
                        "~/Content/toastr-responsive.css"
            ));

            // Custom LESS files
            var lessBundle = new Bundle("~/Content/Less")
                .Include("~/Content/styles.less");
            lessBundle.Transforms.Add(new LessTransform());
            lessBundle.Transforms.Add(new CssMinify());
            bundles.Add(lessBundle);
        }
    }
}