const gun = Gun();
const CHANNEL_KEY = 'test-channel';
const messages = gun.get(CHANNEL_KEY);

const addMessage = event => {
  const input = document.getElementById('new-message-input');
  const message = input.value;
  messages.set({ message })
  input.value = '';
  event.preventDefault();
}

messages.map().on((item, id) => {
  if (item === null) {
    // FIXME: these items will still have an `id`, maybe need to delete?
    return;
  }
  console.log(JSON.parse(JSON.stringify({ item , id})));
  const itemId = `message-${id}`;
  if (!document.getElementById(itemId)) {
    const template = document.getElementById('message-template');
    const clone = template.content.cloneNode(true);
    clone.id = itemId
    // set message contents
    const span = clone.querySelector('span');
    span.innerText = item.message;
    // set up delete button
    const btn = clone.querySelector('button');
    btn.onclick = function () {
      messages.get(id).put(null);
    }
    // add the new message item
    document.getElementById('message-list').appendChild(clone);
  }
})

/*gun.get(CHANNEL_KEY).on(({ message }, key) => {
  console.log({ message, key });
  document.getElementById('messages').innerText = JSON.stringify(message);
})*/