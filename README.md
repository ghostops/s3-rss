# s3-rss

Do you have a bunch of really old podcast files on your computer that doesn't have an RSS-feed anymore? No? Well then. With this script you can create a static RSS feed hosted on AWS S3 in just 5 easy steps:

1. Upload all your podcast-files to a bucket on S3, make sure they are public.
2. Edit the script to match you preference and AWS setup.
3. Run the script to generate `feed.xml`.
4. Upload the `feed.xml` to the same S3 bucket (or elsewhere) and make it public.
5. You can now add the public url of the `feed.xml` as an RSS feed in your podcast app!

Good luck!