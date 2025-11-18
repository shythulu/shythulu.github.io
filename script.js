const config = {
  primaryRoute: "TOPdesk_API", // or "Email"
  emailFallback: true,
  supportEmail: "support@example.gov.nt.ca",
};

const form = document.getElementById("support-form");
const serviceSelect = document.getElementById("service");
const otherServiceWrap = document.getElementById("otherServiceWrap");
const otherServiceInput = document.getElementById("otherService");
const otherCount = document.getElementById("otherCount");
const paymentFields = document.getElementById("paymentFields");
const accountFields = document.getElementById("accountFields");
const statusPanel = document.getElementById("statusPanel");
const statusMessage = document.getElementById("statusMessage");
const payloadPreview = document.getElementById("payloadPreview");
const routingMode = document.getElementById("routingMode");

function updateRoutingNotice() {
  const fallbackText = config.emailFallback
    ? "Email fallback is enabled if TOPdesk fails."
    : "No fallback enabled.";
  routingMode.textContent = `${config.primaryRoute} is configured as the primary submission route. ${fallbackText}`;
}

function toggleConditionalFields(value) {
  const isPayment = value === "Payment / Checkout / Cart";
  const isAccount = value === "Account / Login / Registration";
  const isOther = value === "Other";

  paymentFields.classList.toggle("hidden", !isPayment);
  accountFields.classList.toggle("hidden", !isAccount);
  otherServiceWrap.classList.toggle("hidden", !isOther);
  otherServiceInput.required = isOther;
}

function formatDeviceType() {
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|iphone|android/.test(ua)) return "Mobile";
  if (/ipad|tablet/.test(ua)) return "Tablet";
  return "Desktop";
}

function parseBrowserDetails() {
  const ua = navigator.userAgent;
  const browserMatch = ua.match(/(edge|edg|chrome|safari|firefox|msie|trident)\/?\s*(\d+)/i);
  let browser = "Unknown";
  let version = "";

  if (browserMatch) {
    browser = browserMatch[1]
      .replace(/edg/i, "Edge")
      .replace(/msie/i, "Internet Explorer")
      .replace(/trident/i, "Internet Explorer");
    version = browserMatch[2];
  }

  const osMatch = ua.match(/(windows nt [\d.]+|mac os x [\d_]+|android [\d.]+|iphone os [\d_]+|ipad; cpu os [\d_]+)/i);
  const os = osMatch ? osMatch[1].replace(/_/g, ".") : "Unknown";

  return {
    browser: version ? `${browser} ${version}` : browser,
    os,
    device: formatDeviceType(),
    pageUrl: window.location.href,
    referrer: document.referrer || "",
  };
}

function hydrateTechnicalFields() {
  const { browser, os, device, pageUrl, referrer } = parseBrowserDetails();
  document.getElementById("browser").value = browser;
  document.getElementById("os").value = os;
  document.getElementById("device").value = device;
  document.getElementById("pageUrl").value = pageUrl;
  document.getElementById("referrer").value = referrer;
}

function generateReference() {
  const random = Math.floor(Math.random() * 90000 + 10000);
  return `ESUP-${random}`;
}

function buildPayload(formData) {
  const service = formData.get("service");
  const isPayment = service === "Payment / Checkout / Cart";
  const isAccount = service === "Account / Login / Registration";
  const otherDetail = service === "Other" ? formData.get("otherService") : "";

  const technicalContext = {
    browser: formData.get("browser"),
    os: formData.get("os"),
    device: formData.get("device"),
    pageUrl: formData.get("pageUrl"),
    referrer: formData.get("referrer"),
  };

  const optionalDetails = {
    payment: isPayment
      ? {
          orderNumber: formData.get("orderNumber"),
          cardLast4: formData.get("cardLast4"),
          provider: formData.get("paymentProvider"),
        }
      : undefined,
    account: isAccount
      ? {
          username: formData.get("username"),
          accountId: formData.get("accountId"),
        }
      : undefined,
  };

  const payload = {
    route: config.primaryRoute,
    fallbackEnabled: config.emailFallback,
    contact: {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      confirmEmail: formData.get("confirmEmail") || undefined,
    },
    service: {
      name: service,
      otherDetail: otherDetail || undefined,
    },
    issue: {
      task: formData.get("task"),
      description: formData.get("issue"),
      error: formData.get("error"),
      timestamp: formData.get("timestamp"),
    },
    technicalContext,
    optionalDetails,
    summary: `[${service}] ${formData.get("task") || "Support request"}`,
  };

  return payload;
}

function validateEmails(formData) {
  const email = formData.get("email");
  const confirm = formData.get("confirmEmail");
  if (confirm && confirm.trim() && confirm.trim() !== email.trim()) {
    return "Email addresses do not match.";
  }
  return "";
}

function showStatus(message, payload) {
  statusPanel.classList.remove("hidden");
  statusMessage.textContent = message;
  payloadPreview.textContent = JSON.stringify(payload, null, 2);
  statusPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleSubmission(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const emailMismatch = validateEmails(formData);

  if (emailMismatch) {
    alert(emailMismatch);
    return;
  }

  const payload = buildPayload(formData);
  const reference = generateReference();
  payload.reference = reference;
  payload.routeTaken = config.primaryRoute;

  // Simulated submission flow for static demo
  let message = `Success! Your request has been captured. Reference: ${reference}.`;
  if (config.primaryRoute === "TOPdesk_API") {
    message += " We will create a TOPdesk incident with the details provided.";
    if (config.emailFallback) {
      message += " If the API is unavailable, we will send the same payload via email.";
    }
  } else {
    message += ` We will email ${config.supportEmail} with your request and the machine-readable payload.`;
  }

  showStatus(message, payload);
  form.reset();
  toggleConditionalFields("");
  hydrateTechnicalFields();
}

form.addEventListener("submit", handleSubmission);
serviceSelect.addEventListener("change", (event) => {
  toggleConditionalFields(event.target.value);
});

otherServiceInput.addEventListener("input", () => {
  otherCount.textContent = `${otherServiceInput.value.length} / 400`;
});

document.addEventListener("DOMContentLoaded", () => {
  hydrateTechnicalFields();
  updateRoutingNotice();
});
