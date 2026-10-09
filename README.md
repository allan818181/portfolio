# allan.tanzaniteauto.com

Portfolio of **Allan Muganyizi Deus**, DevOps & Systems Engineer (Dar es Salaam).
Live: **https://allan.tanzaniteauto.com**

The site is a single, hand-written static page (no framework, ~45 KB of HTML) deployed the way I run production systems:

| Layer | What it is |
|---|---|
| Hosting | Private Amazon S3 bucket (encrypted, versioned) |
| CDN + TLS | Amazon CloudFront with Origin Access Control, ACM certificate, HTTP/2 + HTTP/3, TLS 1.2+ |
| Security | HSTS, strict Content-Security-Policy (no inline scripts), X-Frame-Options DENY, Permissions-Policy |
| Infrastructure as code | [`infra/portfolio.yml`](infra/portfolio.yml) (CloudFormation) |
| CI/CD | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): link check, S3 sync with cache headers, CDN invalidation, smoke test |
| Credentials | GitHub OIDC to a least-privilege IAM role: no AWS keys stored anywhere |

## Deploy the infrastructure

```bash
aws cloudformation deploy --region us-east-1 --stack-name portfolio \
  --template-file infra/portfolio.yml --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides GitHubOidcProviderArn=<oidc-provider-arn>
```

Then add the ACM validation CNAME and `allan CNAME <distribution>.cloudfront.net` at the DNS host, and set the repository variables `AWS_DEPLOY_ROLE_ARN`, `SITE_BUCKET` and `DISTRIBUTION_ID`. Every push to `main` deploys.

## Run locally

```bash
python3 -m http.server -d site 8080
```
