

import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dockerComposeRaw = `services:
  openclaw:
    image: 'coollabsio/openclaw:2026.2.6'
    environment:
      AUTH_USERNAME: $SERVICE_USER_OPENCLAW
      AUTH_PASSWORD: \${SERVICE_PASSWORD_OPENCLAW}
      OPENCLAW_GATEWAY_TOKEN: \${SERVICE_PASSWORD_64_GATEWAYTOKEN}
      ANTHROPIC_API_KEY: '\${ANTHROPIC_API_KEY}'
      OPENAI_API_KEY: '\${OPENAI_API_KEY}'
      OPENROUTER_API_KEY: '\${OPENROUTER_API_KEY}'
      GEMINI_API_KEY: '\${GEMINI_API_KEY}'
      XAI_API_KEY: '\${XAI_API_KEY}'
      GROQ_API_KEY: '\${GROQ_API_KEY}'
      MISTRAL_API_KEY: '\${MISTRAL_API_KEY}'
      CEREBRAS_API_KEY: '\${CEREBRAS_API_KEY}'
      VENICE_API_KEY: '\${VENICE_API_KEY}'
      MOONSHOT_API_KEY: '\${MOONSHOT_API_KEY}'
      KIMI_API_KEY: '\${KIMI_API_KEY}'
      MINIMAX_API_KEY: '\${MINIMAX_API_KEY}'
      ZAI_API_KEY: '\${ZAI_API_KEY}'
      AI_GATEWAY_API_KEY: '\${AI_GATEWAY_API_KEY}'
      OPENCODE_API_KEY: '\${OPENCODE_API_KEY}'
      SYNTHETIC_API_KEY: '\${SYNTHETIC_API_KEY}'
      COPILOT_GITHUB_TOKEN: '\${COPILOT_GITHUB_TOKEN}'
      XIAOMI_API_KEY: '\${XIAOMI_API_KEY}'
      OPENCLAW_PRIMARY_MODEL: '\${OPENCLAW_PRIMARY_MODEL}'
      DEEPGRAM_API_KEY: '\${DEEPGRAM_API_KEY}'
      AWS_ACCESS_KEY_ID: '\${AWS_ACCESS_KEY_ID}'
      AWS_SECRET_ACCESS_KEY: '\${AWS_SECRET_ACCESS_KEY}'
      AWS_REGION: '\${AWS_REGION:-us-east-1}'
      AWS_SESSION_TOKEN: '\${AWS_SESSION_TOKEN}'
      BEDROCK_PROVIDER_FILTER: '\${BEDROCK_PROVIDER_FILTER:-anthropic}'
      OLLAMA_BASE_URL: '\${OLLAMA_BASE_URL}'
      PORT: '8080'
      OPENCLAW_GATEWAY_PORT: 18789
      OPENCLAW_GATEWAY_BIND: '\${OPENCLAW_GATEWAY_BIND:-loopback}'
      OPENCLAW_STATE_DIR: /data/.openclaw
      OPENCLAW_WORKSPACE_DIR: /data/workspace
      BROWSER_CDP_URL: 'http://browser:9223'
      BROWSER_DEFAULT_PROFILE: '\${BROWSER_DEFAULT_PROFILE:-openclaw}'
      BROWSER_EVALUATE_ENABLED: '\${BROWSER_EVALUATE_ENABLED:-true}'
      BROWSER_SNAPSHOT_MODE: '\${BROWSER_SNAPSHOT_MODE:-efficient}'
      BROWSER_REMOTE_TIMEOUT_MS: '\${BROWSER_REMOTE_TIMEOUT_MS:-1500}'
      BROWSER_REMOTE_HANDSHAKE_TIMEOUT_MS: '\${BROWSER_REMOTE_HANDSHAKE_TIMEOUT_MS:-3000}'
      HOOKS_ENABLED: '\${HOOKS_ENABLED:-false}'
      HOOKS_PATH: '\${HOOKS_PATH:-/hooks}'
      MOONSHOT_BASE_URL: '\${MOONSHOT_BASE_URL:-https://api.moonshot.ai/v1}'
      KIMI_BASE_URL: '\${KIMI_BASE_URL:-https://api.moonshot.ai/anthropic}'
      TELEGRAM_BOT_TOKEN: '\${TELEGRAM_BOT_TOKEN}'
      DISCORD_BOT_TOKEN: '\${DISCORD_BOT_TOKEN}'
      SLACK_BOT_TOKEN: '\${SLACK_BOT_TOKEN}'
      SLACK_APP_TOKEN: '\${SLACK_APP_TOKEN}'
      WHATSAPP_ENABLED: '\${WHATSAPP_ENABLED}'
      OPENCLAW_DOCKER_APT_PACKAGES: '\${OPENCLAW_DOCKER_APT_PACKAGES}'
      COOLIFY_RESOURCE_UUID: pos4ss000s8w4ko8skcwcgss
      COOLIFY_CONTAINER_NAME: openclaw-pos4ss000s8w4ko8skcwcgss
      COOLIFY_FQDN: openclaw-pos4ss000s8w4ko8skcwcgss.76.13.240.69.sslip.io
      COOLIFY_URL: 'http://openclaw-pos4ss000s8w4ko8skcwcgss.76.13.240.69.sslip.io'
      SERVICE_FQDN_OPENCLAW: openclaw-zc4sk4s80ogk48cgc84s0ww0.76.13.240.69.sslip.io
      SERVICE_URL_OPENCLAW: 'http://openclaw-zc4sk4s80ogk48cgc84s0ww0.76.13.240.69.sslip.io'
      SERVICE_FQDN_OPENCLAW_8080: openclaw-zc4sk4s80ogk48cgc84s0ww0.76.13.240.69.sslip.io:8080
      SERVICE_NAME_OPENCLAW: openclaw
      SERVICE_NAME_BROWSER: browser
    volumes:
      - 'pos4ss000s8w4ko8skcwcgss_openclaw-data:/data'
    depends_on:
      browser:
        condition: service_healthy
    healthcheck:
      test:
        - CMD
        - curl
        - '-sf'
        - 'http://127.0.0.1:8080/healthz'
      interval: 10s
      timeout: 10s
      retries: 5
    container_name: openclaw-pos4ss000s8w4ko8skcwcgss
    restart: unless-stopped
    labels:
      - coolify.managed=true
      - coolify.version=4.0.0-beta.463
      - coolify.type=service
      - coolify.name=openclaw-pos4ss000s8w4ko8skcwcgss
      - coolify.resourceName=openclaw-pos4ss000s8w4ko8skcwcgss
      - coolify.projectName=openclaw-projectyhn
      - coolify.serviceName=openclaw
      - coolify.environmentName=production
      - coolify.pullRequestId=0
      - coolify.service.subType=application
      - coolify.service.subName=openclaw
      - traefik.enable=true
      - traefik.http.middlewares.gzip.compress=true
      - traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
      - traefik.http.routers.http-0-pos4ss000s8w4ko8skcwcgss-openclaw.entryPoints=http
      - traefik.http.routers.http-0-pos4ss000s8w4ko8skcwcgss-openclaw.middlewares=gzip
      - 'traefik.http.routers.http-0-pos4ss000s8w4ko8skcwcgss-openclaw.rule=Host(\`\${openclaw-pos4ss000s8w4ko8skcwcgss.76.13.240.69.sslip.io}\`) && PathPrefix(\`/\`)'
      - traefik.http.routers.http-0-pos4ss000s8w4ko8skcwcgss-openclaw.service=http-0-pos4ss000s8w4ko8skcwcgss-openclaw
      - traefik.http.services.http-0-pos4ss000s8w4ko8skcwcgss-openclaw.loadbalancer.server.port=8080
      - 'caddy_0.encode=zstd gzip'
      - 'caddy_0.handle_path.0_reverse_proxy={{upstreams 8080}}'
      - 'caddy_0.handle_path=/*'
      - caddy_0.header=-Server
      - 'caddy_0.try_files={path} /index.html /index.php'
      - 'caddy_0=http://openclaw-pos4ss000s8w4ko8skcwcgss.76.13.240.69.sslip.io'
      - caddy_ingress_network=pos4ss000s8w4ko8skcwcgss
    networks:
      pos4ss000s8w4ko8skcwcgss: null
    env_file:
      - .env
  browser:
    image: 'coollabsio/openclaw-browser:latest'
    environment:
      PUID: '1000'
      PGID: '1000'
      TZ: Etc/UTC
      CHROME_CLI: '--remote-debugging-port=9222'
      COOLIFY_RESOURCE_UUID: pos4ss000s8w4ko8skcwcgss
      COOLIFY_CONTAINER_NAME: browser-pos4ss000s8w4ko8skcwcgss
      SERVICE_NAME_OPENCLAW: openclaw
      SERVICE_NAME_BROWSER: browser
    volumes:
      - 'pos4ss000s8w4ko8skcwcgss_browser-data:/config'
    shm_size: 2g
    healthcheck:
      test:
        - CMD-SHELL
        - "bash -c ':> /dev/tcp/127.0.0.1/9222' || exit 1"
      interval: 5s
      timeout: 5s
      retries: 10
    container_name: browser-pos4ss000s8w4ko8skcwcgss
    restart: unless-stopped
    labels:
      - coolify.managed=true
      - coolify.version=4.0.0-beta.463
      - coolify.type=service
      - coolify.name=browser-pos4ss000s8w4ko8skcwcgss
      - coolify.resourceName=openclaw-pos4ss000s8w4ko8skcwcgss
      - coolify.projectName=openclaw-projectyhn
      - coolify.serviceName=browser
      - coolify.environmentName=production
      - coolify.pullRequestId=0
      - coolify.service.subType=application
      - coolify.service.subName=browser
    networks:
      pos4ss000s8w4ko8skcwcgss: null
    env_file:
      - .env
volumes:
  pos4ss000s8w4ko8skcwcgss_openclaw-data:
    name: pos4ss000s8w4ko8skcwcgss_openclaw-data
  pos4ss000s8w4ko8skcwcgss_browser-data:
    name: pos4ss000s8w4ko8skcwcgss_browser-data
networks:
  pos4ss000s8w4ko8skcwcgss:
    name: pos4ss000s8w4ko8skcwcgss
    external: true`;

const dockerComposeBase64 = Buffer.from(dockerComposeRaw).toString('base64');

// Helper to extract a field from either JSON body or form data
function getField(body, key) {
  if (!body) return undefined;
  const val = body[key];
  return typeof val === 'string' ? val : (val !== undefined ? String(val) : undefined);
}

app.post('/deploy', async (req, res) => {
  try {
    const body = req.body;

    const baseUrl = process.env.COOLIFY_BASE_URL;
    const token = process.env.COOLIFY_API_TOKEN;

    const projectNameBase = getField(body, 'projectName')?.trim() || 'openclaw';
    const uniqueSuffix = crypto.randomBytes(4).toString('hex');
    const projectName = `${projectNameBase}-${uniqueSuffix}`;

    const openclawUsername = getField(body, 'openclawUsername') || 'admin';
    const customDomain = getField(body, 'customDomain')?.trim();

    let openclawPassword = getField(body, 'openclawPassword');
    if (!openclawPassword) {
      openclawPassword = crypto.randomBytes(16).toString('hex');
    }

    let openclawGatewayToken = getField(body, 'openclawGatewayToken');
    if (!openclawGatewayToken) {
      openclawGatewayToken = crypto.randomBytes(32).toString('base64');
    }

    if (!baseUrl || !token || !projectName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: baseUrl, token, projectName',
      });
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // ── 1. Create project ──────────────────────────────────────────────────────
    console.log('Creating project:', projectName);
    const projRes = await fetch(`${baseUrl}/api/v1/projects`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: projectName }),
    });

    if (!projRes.ok) {
      const errorText = await projRes.text();
      return res.status(projRes.status).json({
        success: false,
        error: `Project creation failed: ${projRes.status} - ${errorText}`,
      });
    }

    const project = await projRes.json();
    const projectUuid = project.uuid;
    console.log('Project created:', projectUuid);

    // ── 2. Ensure production environment exists ────────────────────────────────
    try {
      await fetch(`${baseUrl}/api/v1/projects/${projectUuid}/environments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: 'production' }),
      });
    } catch {
      console.log('Environment already exists, continuing...');
    }

    // ── 3. Resolve server ──────────────────────────────────────────────────────
    const serversRes = await fetch(`${baseUrl}/api/v1/servers`, { headers });
    if (!serversRes.ok) {
      return res.status(serversRes.status).json({
        success: false,
        error: `Failed to fetch servers: ${serversRes.status}`,
      });
    }

    const servers = await serversRes.json();
    if (!servers?.length) {
      return res.status(400).json({
        success: false,
        error: 'No servers found. Add a server in Coolify first.',
      });
    }

    const serverUuid = servers[0].uuid;
    console.log('Using server:', serverUuid);

    // ── 4. Create service ──────────────────────────────────────────────────────
    console.log('Creating OpenClaw service...');

    const serviceBody = {
      name: 'OpenClaw',
      project_uuid: projectUuid,
      environment_name: 'production',
      server_uuid: serverUuid,
      destination_uuid: serverUuid,
      instant_deploy: false,
      docker_compose_raw: dockerComposeBase64,
    };

    if (customDomain) {
      serviceBody.urls = [{ name: 'openclaw', url: customDomain }];
      serviceBody.force_domain_override = true;
    }

    const serviceRes = await fetch(`${baseUrl}/api/v1/services`, {
      method: 'POST',
      headers,
      body: JSON.stringify(serviceBody),
    });

    if (!serviceRes.ok) {
      const errorText = await serviceRes.text();
      return res.status(serviceRes.status).json({
        success: false,
        error: `Service creation failed: ${serviceRes.status}`,
        details: errorText,
        projectUuid,
      });
    }

    const service = await serviceRes.json();
    const serviceUuid = service.uuid;
    console.log('✅ Service created:', serviceUuid);

    // ── 5. Build env var list ──────────────────────────────────────────────────
    const envEntries = [
      { key: 'SERVICE_USER_OPENCLAW', value: openclawUsername },
      { key: 'SERVICE_PASSWORD_OPENCLAW', value: openclawPassword },
      { key: 'SERVICE_PASSWORD_64_GATEWAYTOKEN', value: openclawGatewayToken },
    ];

    const serviceUrlOpenClaw =
      getField(body, 'SERVICE_URL_OPENCLAW_8080')?.trim() ||
      `${baseUrl.replace(/:8000$/, '')}:8080`;
    envEntries.push({ key: 'SERVICE_URL_OPENCLAW_8080', value: serviceUrlOpenClaw });

    const optionalKeys = [
      'ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'OPENROUTER_API_KEY',
      'GEMINI_API_KEY', 'XAI_API_KEY', 'GROQ_API_KEY',
      'MISTRAL_API_KEY', 'CEREBRAS_API_KEY', 'VENICE_API_KEY',
      'MOONSHOT_API_KEY', 'KIMI_API_KEY', 'MINIMAX_API_KEY',
      'ZAI_API_KEY', 'AI_GATEWAY_API_KEY', 'OPENCODE_API_KEY',
      'SYNTHETIC_API_KEY', 'COPILOT_GITHUB_TOKEN', 'XIAOMI_API_KEY',
      'OPENCLAW_PRIMARY_MODEL', 'DEEPGRAM_API_KEY', 'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_SESSION_TOKEN',
      'BEDROCK_PROVIDER_FILTER', 'OLLAMA_BASE_URL', 'TELEGRAM_BOT_TOKEN',
      'DISCORD_BOT_TOKEN', 'SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN',
      'WHATSAPP_ENABLED', 'OPENCLAW_DOCKER_APT_PACKAGES',
    ];

    for (const key of optionalKeys) {
      const val = getField(body, key)?.trim();
      if (val) envEntries.push({ key, value: val });
    }

    // ── 6. Bulk-update env vars ────────────────────────────────────────────────
    const bulkBody = {
      data: envEntries.map(({ key, value }) => ({
        key,
        value,
        is_preview: false,
        is_literal: false,
        is_multiline: true,
        is_shown_once: false,
      })),
    };

    console.log(`Bulk-updating ${envEntries.length} env vars...`);
    const bulkRes = await fetch(`${baseUrl}/api/v1/services/${serviceUuid}/envs/bulk`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(bulkBody),
    });

    if (!bulkRes.ok) {
      const errorText = await bulkRes.text();
      console.error('Bulk env update failed:', bulkRes.status, errorText);
    } else {
      console.log('✅ Env vars bulk-updated successfully');
    }

    // ── 7. Trigger deployment ──────────────────────────────────────────────────
    console.log('Triggering deployment...');
    const deployRes = await fetch(`${baseUrl}/api/v1/deploy?uuid=${serviceUuid}`, {
      method: 'POST',
      headers,
    });

    if (!deployRes.ok) {
      const errorText = await deployRes.text();
      console.error('Deployment trigger failed:', deployRes.status, errorText);
    } else {
      console.log('✅ Deployment triggered successfully');
    }

    return res.status(200).json({
      success: true,
      message: '🎉 OpenClaw deployed! Service created, env vars updated, and deployment triggered.',
      serviceUuid,
      projectUuid,
      credentials: {
        username: openclawUsername,
        password: openclawPassword,
        gatewayToken: openclawGatewayToken,
        serviceUrl: serviceUrlOpenClaw,
      },
      nextSteps: [
        '1. Wait for "Deploy" to complete',
        '2. Access OpenClaw using the access url',
        '3. Login with the credentials shown above',
      ],
    });
  } catch (error) {
    console.error('Deployment error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

app.get('/status', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'online',
    message: 'OpenClaw Deploy API is up and running.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;