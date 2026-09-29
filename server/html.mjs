export function payloadScript(payload) {
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return `<script type="application/json" id="rulecms-payload">${json}</script>`;
}

export function applyTemplate(template, rendered) {
  return template
    .replace("<!--app-html-->", rendered.html)
    .replace("<!--payload-->", payloadScript(rendered.payload));
}
