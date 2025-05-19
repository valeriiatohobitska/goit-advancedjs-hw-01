const form = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

loadFormData();

function loadFormData() {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData = { ...formData, ...parsedData };

      if (form.elements.email) {
        form.elements.email.value = parsedData.email || '';
      }

      if (form.elements.message) {
        form.elements.message.value = parsedData.message || '';
      }
    } catch (error) {
      console.error('Invalid data in localStorage', error);
    }
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(storageKey, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill all fields');
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(storageKey);
  formData = { email: '', message: '' };
});
