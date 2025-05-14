echo Deploying to S3...
aws s3 sync build/ s3://www.chef.classicfry.co.uk --delete
echo Deployment Completed!
echo Creating invalidation
aws cloudfront create-invalidation --distribution-id E19NGL19T4JTHL --paths "/*"
pause