# Local build CA

The Dockerfiles append any `*.crt` files in this directory to `NODE_EXTRA_CA_CERTS` while installing npm packages. This lets local builds work on machines where antivirus or a corporate proxy (for example Avast Web/Mail Shield) intercepts TLS.

The bundled `avast-web-shield-root.crt` is a public root certificate exported from Windows. It is used only during the dependency-install layer and is not copied into the runtime images.

Remove the file if the machine does not perform TLS inspection; the Dockerfiles skip the CA setup when no certificates are present.
