/* Tiny vanilla JS for UX, validation, and analytics hooks
   - Tracks CTA clicks via data-cta
   - Validates form (requires name + boat + location + service + one of phone/email)
   - Submits via fetch to Formspree and shows toasts
   - Respects reduced motion (no animations here anyway)
   - TODO: GA4/CallRail snippet can consume window.dataLayer events
*/
(function(){
  window.dataLayer = window.dataLayer || [];

  // CTA click tracking
  document.addEventListener('click', function(e){
    const el = e.target.closest('[data-cta]');
    if(!el) return;
    window.dataLayer.push({
      event: 'cta_click',
      cta: el.getAttribute('data-cta'),
      text: (el.textContent || '').trim()
    });
  });

  // Toast helper
  const toastEl = document.getElementById('toast');
  function toast(msg, ok=true){
    if(!toastEl) return;
    toastEl.className = 'toast ' + (ok ? 'ok' : 'err');
    toastEl.innerHTML = '<span class="bubble" role="alert">'+ msg +'</span>';
  }

  // Form validation and submit
  const form = document.getElementById('quote-form');
  if(form){
    form.addEventListener('submit', async function(ev){
      ev.preventDefault();
      const fd = new FormData(form);
      const need = (name)=> (fd.get(name)||'').trim();
      const required = ['boat','location','service','name'];
      for(const key of required){
        if(!need(key)){
          toast('Please complete all required fields.', false);
          return;
        }
      }
      const hasPhone = !!need('phone');
      const hasEmail = !!need('email');
      if(!hasPhone && !hasEmail){
        toast('Add a phone or email so we can reply.', false);
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn && (submitBtn.disabled = true);

      try{
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: fd
        });
        if(res.ok){
          toast('Thanks — your request was sent. We’ll reply shortly.', true);
          window.dataLayer.push({ event: 'form_submit_success' });
          form.reset();
        }else{
          toast('There was an issue sending your request. Please call or email.', false);
        }
      }catch(err){
        toast('Network error — please try again, or call us.', false);
      }finally{
        submitBtn && (submitBtn.disabled = false);
      }
    });
  }
})();

