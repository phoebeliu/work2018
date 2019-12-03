# pure css loader

https://codepen.io/rbv912/pen/dYbqLQ

by Nobuaki Honma (@RBV912) https://twitter.com/RBV912

```html
<div class="wrapper">
    <ul class="loader-list">
      <li>
        <!-- Loader 1-->
        <div class="loader-1 center"><span></span></div>
      </li>
      <li>
        <!-- Loader 2 -->
        <div class="loader-2 center"><span></span></div>
      </li>
      <li>
        <!-- Loader 3 -->
        <div class="loader-3 center"><span></span></div>
      </li>
      <li>
        <!-- Loader 4 -->
        <div class="loader-4 center"><span></span></div>
      </li>
      <li>
        <!-- Loader 5 -->
        <div class="loader-5 center"><span></span></div>
      </li>
      <li>
        <!-- Loader 6 -->
        <div class="loader-6 center"><span></span></div>
      </li>
    </ul>
</div>
```

```css
*, ::after, ::before { -webkit-box-sizing: border-box; box-sizing: border-box; }
html { width: 100%; height: 100%; font-size: 62.5%; }
body { width: 100%; height: 100%; background: #3530F0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }


/* Loader 1 */
.loader-1 {
	height: 32px;
	width: 32px;
	-webkit-animation: loader-1-1 4.8s linear infinite;
	        animation: loader-1-1 4.8s linear infinite;
}
@-webkit-keyframes loader-1-1 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-1-1 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-1 span {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	clip: rect(0, 32px, 32px, 16px);
	-webkit-animation: loader-1-2 1.2s linear infinite;
	        animation: loader-1-2 1.2s linear infinite;
}
@-webkit-keyframes loader-1-2 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(220deg); }
}
@keyframes loader-1-2 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(220deg); }
}
.loader-1 span::after {
	content: "";
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	clip: rect(0, 32px, 32px, 16px);
	border: 3px solid #FFF;
	border-radius: 50%;
	-webkit-animation: loader-1-3 1.2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-1-3 1.2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-1-3 {
	0%   { -webkit-transform: rotate(-140deg); }
	50%  { -webkit-transform: rotate(-160deg); }
	100% { -webkit-transform: rotate(140deg); }
}
@keyframes loader-1-3 {
	0%   { transform: rotate(-140deg); }
	50%  { transform: rotate(-160deg); }
	100% { transform: rotate(140deg); }
}

/* Loader 2 */
.loader-2 {
  display: block;
	height: 32px;
	width: 32px;
	-webkit-animation: loader-2-1 3s linear infinite;
	        animation: loader-2-1 3s linear infinite;
}
@-webkit-keyframes loader-2-1 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-2-1 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-2 span {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	clip: rect(16px, 32px, 32px, 0);
	-webkit-animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-2-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-2-2 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-2-2 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-2 span::before {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	border: 3px solid transparent;
	border-top: 3px solid #FFF;
	border-radius: 50%;
	-webkit-animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-2-3 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-2-3 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-2-3 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-2 span::after {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	border: 3px solid rgba(255, 255, 255, .5);
	border-radius: 50%;
}

/* Loader 3 */
.loader-3 {
  display: block;
	height: 32px;
	width: 32px;
}
.loader-3 span {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
}
.loader-3 span::before {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	border: 3px solid #FFF;
	border-bottom: 3px solid transparent;
	border-radius: 50%;
	-webkit-animation: loader-3-1 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-3-1 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-3-1 {
	0%   { -webkit-transform: rotate(0deg); }
	40%  { -webkit-transform: rotate(180deg); }
	60%  { -webkit-transform: rotate(180deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-3-1 {
	0%   { transform: rotate(0deg); }
	40%  { transform: rotate(180deg); }
	60%  { transform: rotate(180deg); }
	100% { transform: rotate(360deg); }
}
.loader-3 span::after {
	content: "";
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	width: 6px;
	height: 6px;
	background: #FFF;
	border-radius: 50%;
	-webkit-animation: loader-3-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-3-2 1.5s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-3-2 {
	0%   { -webkit-transform: translate3d(0, -32px, 0) scale(0, 2); opacity: 0; }
	50%  { -webkit-transform: translate3d(0, 0, 0) scale(1.25, 1.25); opacity: 1; }
	100% { -webkit-transform: translate3d(0, 8px, 0) scale(0, 0); opacity: 0; }
}
@keyframes loader-3-2 {
	0%   { transform: translate3d(0, -32px, 0) scale(0, 2); opacity: 0; }
	50%  { transform: translate3d(0, 0, 0) scale(1.25, 1.25); opacity: 1; }
	100% { transform: translate3d(0, 8px, 0) scale(0, 0); opacity: 0; }
}

/* Loader 4 */
.loader-4 {
	height: 32px;
	width: 32px;
}
.loader-4::after {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	width: 12px;
	height: 12px;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	background: #FFF;
	border-radius: 50%;
	-webkit-animation: loader-4-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-4-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-4-1 {
	0%   { -webkit-transform: scale(0); opacity: 0; }
	50%  { -webkit-transform: scale(1); opacity: 1; }
	100% { -webkit-transform: scale(0); opacity: 0; }
}
@keyframes loader-4-1 {
	0%   { transform: scale(0); opacity: 0; }
	50%  { transform: scale(1); opacity: 1; }
	100% { transform: scale(0); opacity: 0; }
}
.loader-4 span {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	-webkit-animation: loader-4-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-4-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-4-2 {
	0%   { -webkit-transform: rotate(0deg); }
	50%  { -webkit-transform: rotate(180deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-4-2 {
	0%   { transform: rotate(0deg); }
	50%  { transform: rotate(180deg); }
	100% { transform: rotate(360deg); }
}
.loader-4 span::before,
.loader-4 span::after {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 12px;
	width: 12px;
	background: #FFF;
	border-radius: 50%;
	-webkit-animation: loader-4-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-4-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-4-3 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
	50%  { -webkit-transform: translate3d(-16px, 0, 0) scale(.5); }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-4-3 {
	0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(-16px, 0, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
}
.loader-4 span::after {
	-webkit-animation: loader-4-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-4-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-4-4 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
	50%  { -webkit-transform: translate3d(16px, 0, 0) scale(.5); }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-4-4 {
	0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(16px, 0, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
}

/* Loader 5 */
.loader-5 {
	height: 32px;
	width: 32px;
	-webkit-animation: loader-5-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-5-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-1 {
	0%   { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-5-1 {
	0%   { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
.loader-5::before {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: auto;
	margin: auto;
	width: 8px;
	height: 8px;
	background: #FFF;
	border-radius: 50%;
	-webkit-animation: loader-5-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-5-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-2 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
	50%  { -webkit-transform: translate3d(24px, 0, 0) scale(.5); }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-2 {
	0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(24px, 0, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
}
.loader-5::after {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: auto;
	bottom: 0; right: 0;
	margin: auto;
	width: 8px;
	height: 8px;
	background: #FFF;
	border-radius: 50%;
	-webkit-animation: loader-5-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-5-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-3 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
	50%  { -webkit-transform: translate3d(-24px, 0, 0) scale(.5); }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-3 {
	0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(-24px, 0, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
}
.loader-5 span {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
}
.loader-5 span::before {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: auto; right: 0;
	margin: auto;
	width: 8px;
	height: 8px;
	background: #FFF;
	border-radius: 50%;
	-webkit-animation: loader-5-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-5-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-4 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
	50%  { -webkit-transform: translate3d(0, 24px, 0) scale(.5); }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-4 {
	0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(0, 24px, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
}
.loader-5 span::after {
	content: "";
	display: block;
	position: absolute;
	top: auto; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	width: 8px;
	height: 8px;
	background: #FFF;
	border-radius: 50%;
	-webkit-animation: loader-5-5 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
	        animation: loader-5-5 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-5 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
	50%  { -webkit-transform: translate3d(0, -24px, 0) scale(.5); }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-5 {
	0%   { transform: translate3d(0, 0, 0) scale(1); }
	50%  { transform: translate3d(0, -24px, 0) scale(.5); }
	100% { transform: translate3d(0, 0, 0) scale(1); }
}

/* Loader 6 */
.loader-6 {
	height: 32px;
	width: 32px;
}
.loader-6 span {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
}
.loader-6 span::before,
.loader-6 span::after {
	content: "";
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
	height: 32px;
	width: 32px;
	border: 2px solid #FFF;
	border-radius: 50%;
	opacity: 0;
	-webkit-animation: loader-6-1 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) infinite;
	        animation: loader-6-1 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) infinite;
}
@-webkit-keyframes loader-6-1 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(0); opacity: 1; }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1.5); opacity: 0; }
}
@keyframes loader-6-1 {
	0%   { transform: translate3d(0, 0, 0) scale(0); opacity: 1; }
	100% { transform: translate3d(0, 0, 0) scale(1.5); opacity: 0; }
}
.loader-6 span::after {
	-webkit-animation: loader-6-2 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) .25s infinite;
	        animation: loader-6-2 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) .25s infinite;
}
@-webkit-keyframes loader-6-2 {
	0%   { -webkit-transform: translate3d(0, 0, 0) scale(0); opacity: 1; }
	100% { -webkit-transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
}
@keyframes loader-6-2 {
	0%   { transform: translate3d(0, 0, 0) scale(0); opacity: 1; }
	100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
}

/* Layout */
.center {
	display: block;
	position: absolute;
	top: 0; left: 0;
	bottom: 0; right: 0;
	margin: auto;
}
.wrapper {
	position: relative;
	width: 100%;
	max-width: 1000px;
	height: 100%;
	margin: 0 auto;
}

.loader-list {
	display: -webkit-flex;
	display:         flex;
	-webkit-flex-flow: row wrap;
	        flex-flow: row wrap;
	-webkit-justify-content: center;
	        justify-content: center;
	-webkit-align-items: center;
	        align-items: center;
	-webkit-align-content: center;
	        align-content: center;
	position: relative;
	width: 100%;
	height: 100%;
	clear: both;
}
.loader-list li {
	-webkit-flex: 1 1 auto;
	        flex: 1 1 auto;
	position: relative;
	display: block;
	width: calc(100% / 3);
	height: calc(100vh / 4);
}
```

