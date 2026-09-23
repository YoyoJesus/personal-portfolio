<script lang="ts">
  import emailjs from "@emailjs/browser";
  import { PUBLIC_EMAILJS_PUBLIC_KEY, PUBLIC_EMAILJS_SERVICE_ID, PUBLIC_EMAILJS_TEMPLATE_ID } from "$env/static/public";

  let { open = $bindable(false) } = $props();

  let form: HTMLFormElement;
  let sending = $state(false);
  let toast = $state({ visible: false, message: "", isError: false });
  let toastTimeout: ReturnType<typeof setTimeout>;

  $effect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  });

  function showToast(message: string, isError = false) {
    toast = { visible: true, message, isError };
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => (toast.visible = false), 5000);
  }

  function closeModal() {
    open = false;
    form.reset();
  }

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    sending = true;
    try {
      await emailjs.sendForm(PUBLIC_EMAILJS_SERVICE_ID, PUBLIC_EMAILJS_TEMPLATE_ID, form, PUBLIC_EMAILJS_PUBLIC_KEY);
      showToast("Message sent successfully! I'll get back to you soon.", false);
      closeModal();
    } catch (error) {
      console.error("EmailJS Error:", error);
      showToast("Failed to send message. Please try again.", true);
    } finally {
      sending = false;
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
  id="contact-modal"
  class={["fixed inset-0 z-50 items-center justify-center bg-black/70 backdrop-blur-sm", open ? "flex" : "hidden"]}
  onclick={(e) => e.target === e.currentTarget && closeModal()}
>
  <div class="relative w-full max-w-md rounded-2xl border border-neutral/20 bg-[#1a1a1a] p-8 shadow-2xl">
    <button
      id="close-modal"
      class="absolute top-4 right-4 text-2xl text-neutral transition-colors hover:text-white"
      aria-label="Close modal"
      onclick={closeModal}
    >
      ×
    </button>

    <h2 class="mb-6 font-serif text-3xl font-bold text-white">Get in Touch</h2>

    <form id="contact-form" class="space-y-4" bind:this={form} {onsubmit}>
      <div class="form-group">
        <label for="name" class="mb-2 block text-sm font-medium text-neutral">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="w-full rounded-lg border border-neutral/30 bg-black/50 px-4 py-3 text-white placeholder-neutral/50 transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
          placeholder="Your name"
        />
      </div>

      <div class="form-group">
        <label for="email" class="mb-2 block text-sm font-medium text-neutral">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class="w-full rounded-lg border border-neutral/30 bg-black/50 px-4 py-3 text-white placeholder-neutral/50 transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
          placeholder="your.email@example.com"
        />
      </div>

      <div class="form-group">
        <label for="message" class="mb-2 block text-sm font-medium text-neutral">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          class="w-full resize-none rounded-lg border border-neutral/30 bg-black/50 px-4 py-3 text-white placeholder-neutral/50 transition-all focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none"
          placeholder="Your message..."
        ></textarea>
      </div>

      <button
        type="submit"
        id="submit-btn"
        disabled={sending}
        class="w-full rounded-full bg-primary px-8 py-4 font-medium text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
    </form>
  </div>
</div>

<!-- Toast Notification -->
<div
  id="toast"
  class={[
    "fixed top-4 right-4 z-[60] min-w-[300px] rounded-lg border px-6 py-4 shadow-lg backdrop-blur-sm",
    toast.isError ? "border-red-500/20 bg-red-500/10" : "border-green-500/20 bg-green-500/10",
    !toast.visible && "hidden",
  ]}
>
  <p id="toast-message" class={["text-sm font-medium", toast.isError ? "text-red-400" : "text-green-400"]}>
    {toast.message}
  </p>
</div>
