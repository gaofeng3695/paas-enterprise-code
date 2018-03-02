import Vue from 'vue';

const tip = Vue.directive('tip', {
  bind: function (el, binding) {
    let input = el.querySelector('input');
    let obj = binding.value;
    let tip = obj.tip;
    if (!input || !tip) return;
    let html = document.createElement('div');
    html.innerHTML = tip;
    html.style.color = obj.color || '#c90';
    html.style.fontSize = '12px';
    html.style.lineHeight = '1';
    html.style.paddingTop = '4px';
    html.style.position = 'absolute';
    html.style.background = obj.background || '#fff';
    html.style.zIndex = '9';
    html.style.width = '100%';
    html.style.visibility = 'hidden';
    html.style.top = '100%';
    html.style.left = '0';
    el.append(html);
    input.addEventListener('focus', () => {
      html.style.visibility = 'visible';
      var errtip = el.parentElement.querySelector('.el-form-item__error');
      if (errtip) {
        errtip.style.visibility = 'hidden';
      }

      // el-form-item__error
    });

    input.addEventListener('blur', () => {
      var errtip = el.parentElement.querySelector('.el-form-item__error');
      if (errtip) {
        errtip.style.visibility = 'visible';
      }
      html.style.visibility = 'hidden';
    });
  }
});

export {
  tip
};
