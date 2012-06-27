using System.Web.Optimization;

namespace CodeCamper.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Could break into smaller bundles
            bundles.Add(new ScriptBundle("~/bundles/extlibs")
                .Include(
                    "~/Scripts/lib/json2.min.js", //

                    // jQuery and its plugins
                    "~/Scripts/lib/jquery-1.7.2.min.js", // todo: wildcard ?
                    "~/Scripts/lib/activity-indicator.js",
                    "~/Scripts/lib/jquery.mockjson.js",
                    "~/Scripts/lib/jquery-ui.min.js",
                    "~/Scripts/lib/jquery.wijmo-open.all.2.1.2.min.js", // depends on jquery-ui
                    //"~/Scripts/lib/TrafficCop-amd.js",
                    //"~/Scripts/lib/infuser-amd.js", // depends on TrafficCop

                    // Knockout and its plugins
                    // "~/Scripts/lib/knockout-2.1.0.js",
                    "~/Scripts/lib/knockout-2.1.0.xdebug.js", 
                    //"~/Scripts/lib/knockout.changetracker-amd.js",
                    "~/Scripts/lib/knockout.validation.js",
                    "~/Scripts/lib/knockout.wijmo.js", // depends on jquery-ui and ko
                    //"~/Scripts/lib/koExternalTemplateEngine-amd.js",

                    "~/Scripts/lib/underscore.min.js",
                    "~/Scripts/lib/moment.js",

                    "~/Scripts/lib/sammy.js",
                    "~/Scripts/lib/sammy.title.js",

                    "~/Scripts/lib/amplify.core.js",
                    "~/Scripts/lib/amplify.request.js",
                     "~/Scripts/lib/amplify.store.js",
 
                     "~/Scripts/lib/toastr.js"                
                    ));

            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/lib/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css")
                .Include(
                        "~/Content/jquery.wijmo-*",
                        "~/Content/toastr.css",
                        "~/Content/toastr-responsive.css"
            ));

            var lessBundle = new Bundle("~/Content/Less")
                .Include("~/Content/styles.less");
            lessBundle.Transforms.Add(new LessTransform());
            lessBundle.Transforms.Add(new CssMinify());
            bundles.Add(lessBundle);
        }
    }
}