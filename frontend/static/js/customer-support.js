(() => {
    const widget = document.querySelector('.support-chat');
    if (!widget) return;

    const launcher = widget.querySelector('.support-launcher');
    const panel = widget.querySelector('.support-panel');
    const closeButton = widget.querySelector('.support-close');
    const form = widget.querySelector('.support-form');
    const input = form.querySelector('input');
    const sendButton = form.querySelector('button');
    const messages = widget.querySelector('.support-messages');
    const topics = widget.querySelector('.support-topics');
    const role = widget.dataset.userRole;
    const prompts = role === 'owner'
        ? ['How do I list equipment?', 'Where can I see bookings?', 'How are earnings shown?']
        : ['How do I book equipment?', 'Where can I see my booking?', 'How do I check a payment?'];

    function appendMessage(text, sender) {
        const message = document.createElement('div');
        const paragraph = document.createElement('p');
        message.className = `support-message support-message-${sender}`;
        paragraph.textContent = text;
        message.appendChild(paragraph);
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
        return message;
    }

    function setOpen(open) {
        panel.hidden = !open;
        launcher.setAttribute('aria-expanded', String(open));
        if (open) input.focus();
        else launcher.focus();
    }

    async function sendMessage(text) {
        const message = text.trim();
        if (!message || sendButton.disabled) return;

        appendMessage(message, 'user');
        input.value = '';
        sendButton.disabled = true;
        const typing = appendMessage('Checking that for you...', 'bot');

        try {
            const response = await fetch('/api/support-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            typing.remove();

            if (!response.ok) {
                appendMessage(data.error || 'Support is unavailable right now. Please try again.', 'bot');
                return;
            }
            appendMessage(data.reply, 'bot');
        } catch (error) {
            typing.remove();
            appendMessage('I could not connect just now. Please try again in a moment.', 'bot');
        } finally {
            sendButton.disabled = false;
            input.focus();
        }
    }

    prompts.forEach((prompt) => {
        const button = document.createElement('button');
        button.className = 'support-topic';
        button.type = 'button';
        button.textContent = prompt;
        button.addEventListener('click', () => sendMessage(prompt));
        topics.appendChild(button);
    });

    launcher.addEventListener('click', () => setOpen(panel.hidden));
    closeButton.addEventListener('click', () => setOpen(false));
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        sendMessage(input.value);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hidden) setOpen(false);
    });
})();