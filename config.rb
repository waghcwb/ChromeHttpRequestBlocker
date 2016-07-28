additional_import_paths = [
	"src/css/", "vendor/",
	"vendor/bootstrap-sass/assets/stylesheets",
	"vendor/Ionicons/scss"
]

http_path = "/"

sass_dir        = "src/css/"
css_dir         = "dist/css/"
images_dir      = "dist/img/"
javascripts_dir = "dist/js/"
fonts_dir       = "dist/fonts"

relative_assets = true
line_comments   = false
output_style    = (environment == :production) ? :compressed : :expanded