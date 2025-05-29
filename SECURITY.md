# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this website, please send an email to [YOUR-EMAIL]. All security vulnerabilities will be promptly addressed.

## Security Measures in Place

1. **Content Security Policy (CSP)**
   - Strict CSP headers are implemented
   - External resources are limited to trusted domains
   - Inline scripts are minimized and controlled

2. **HTTP Security Headers**
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block
   - X-Content-Type-Options: nosniff
   - Strict-Transport-Security: max-age=31536000
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: Restricts browser features

3. **Admin Access**
   - Protected by Netlify Identity
   - Restricted access to admin paths
   - No-cache policy for admin pages

4. **Asset Security**
   - Subresource Integrity (SRI) for external resources
   - Safe DOM manipulation practices
   - Sanitized user inputs

## Security Best Practices

1. **Regular Updates**
   - Keep all dependencies updated
   - Review and update security headers regularly
   - Monitor Netlify security advisories

2. **Access Control**
   - Regularly rotate admin credentials
   - Use strong passwords
   - Enable two-factor authentication where possible

3. **Content Management**
   - Validate and sanitize all user inputs
   - Regularly backup content
   - Monitor for unauthorized changes

4. **Monitoring**
   - Enable Netlify deploy notifications
   - Monitor site analytics for suspicious activity
   - Keep logs of admin access

## Implementation Notes

1. The site uses Netlify's security features:
   - HTTPS enforcement
   - Deploy previews
   - Branch deploy controls
   - Identity service for authentication

2. Custom security measures:
   - Restricted admin access
   - Enhanced CSP headers
   - DOM sanitization

## Maintenance

1. **Monthly Tasks**
   - Review security headers
   - Update dependencies
   - Check for new security best practices

2. **Quarterly Tasks**
   - Full security audit
   - Update security documentation
   - Review access logs

3. **Annual Tasks**
   - Comprehensive security review
   - Update security policy
   - Penetration testing 