// ==UserScript==
// @name         为 Eslint 在线运行添加修复按钮
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://eslint.nodejs.cn/play/
// @match        https://eslint.org/play/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nodejs.cn
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const addButtonToConfigOptions = () => {
    const button = document.createElement('button');
    const cssCode = '#handleFixButton{width:calc(100% - 20px);height:60px;background:#4b32c3;color:#fff;margin:10px;box-sizing:border-box;border-radius:4px;font-size:20px;}#handleFixButton.disabled{opacity:0.6;cursor:not-allowed;}#problems{display:flex;gap:20px;align-items:center;justify-content:space-between;width:calc(100% - 20px);margin: 10px;box-sizing:border-box;border:1px solid #667085;padding:10px;color:#D0D5DD;border-radius:4px;}#problems>span{width:100%;text-align:center;}#problems>em{display:block;width:1px;height:20px;background:#667085;}';
    const styleElement = document.createElement('style');
    styleElement.textContent = cssCode;
    button.textContent = '修复';
    button.id = 'handleFixButton';
    const problems = document.createElement('div');
    problems.id = 'problems';
    problems.innerHTML = '<span id="total">待修复: 0</span><em></em><span id="solved">已修复: 0</span>';
    const configOptions = document.querySelector('.playground__config-options__sections');
    if (configOptions.firstChild) {
      configOptions.insertBefore(button, configOptions.firstChild);
      configOptions.insertBefore(problems, configOptions.firstChild);
      configOptions.insertBefore(styleElement, configOptions.firstChild);
    } else {
      configOptions.appendChild(button);
      configOptions.appendChild(problems);
      configOptions.appendChild(styleElement);
    }
  };
  const handleFix = () => {
    let times = 0;
    refreshProblemsData();
    handleFixButton.addEventListener('click', function () {
      const problemsTotal = refreshProblemsData();
      handleFixButton.disabled = true;
      handleFixButton.classList.add('disabled');
      const setIntervalID = setInterval(function () {
        if (times < problemsTotal) {
          const fixButton = document.querySelector('button.alert__fix-btn');
          fixButton.click();
          times++;
          document.querySelector('#solved').textContent = `已修复: ${times}`;
          console.log('已修复');
        } else {
          clearInterval(setIntervalID);
          alert('修复完毕！');
          handleFixButton.disabled = false;
          handleFixButton.classList.remove('disabled');
        }
      }, 100);
    });
  };
  const refreshProblemsData = () =>{
    const fixButtons = document.querySelectorAll('button.alert__fix-btn');
    document.querySelector('#total').textContent = `待修复: ${fixButtons.length}`;
    return fixButtons.length;
  };
  addButtonToConfigOptions();
  handleFix();
})();
