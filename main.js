import { $, h as html, on, css } from "https://libh.dev";

const Main = () => {
	const
		pass = $(""),

		refreshPass = () => {

			const
				base =
					(use_a_z.$ ? "abcdefghijklmnopqrstuvwxyz" : "") +
					(use_A_Z.$ ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
					(use_1_9.$ ? "0123456789" : "") +
					(use_special.$ ? special.$ : "")
				,
				baseLength = base.length
			;
	
			pass.$ = Array.from(crypto.getRandomValues(passBaseBuffer).slice(0, length.$)).map(q => base[Math.floor(q * baseLength / (2 ** 32 - 1))]).join("");
		},

		length = $(16).watch(refreshPass),

		use_a_z = $(true).watch(refreshPass),
		use_A_Z = $(true).watch(refreshPass),
		use_1_9 = $(true).watch(refreshPass),
		use_special = $(false).watch(refreshPass),
		special = $("!#$%&'()=~|\`{+*}<>?_").watch(refreshPass),

		passBaseBuffer = new Uint32Array(1024);
	;

	refreshPass();

	return html`

		<label>Length: ${length}<input ${{ type: "range", value: length, min: 4, max: 1024, [css.width]: "50%" }}></label>
		<br>

		<div>
			<label>a ~ z<input ${{ type: "checkbox", checked: use_a_z }}/></label>
			<label>A ~ Z<input ${{ type: "checkbox", checked: use_A_Z }}/></label>
			<label>0 ~ 9<input ${{ type: "checkbox", checked: use_1_9 }}/></label><br>
			<label>Special token: <input ${{ type: "checkbox", checked: use_special }}/></label>
			<input ${{ type: "text", value: special, disabled: use_special.into($ => !$) }}/>
		</div>

		<!-- <br> -->

		<input ${{
			type: "button",
			value: "copy",
			[on.click]: () => navigator.clipboard.writeText(pass.$)
		}}/>
		<input ${{
			type: "button",
			value: "refresh",
			[on.click]: refreshPass
		}}/>

		<h1 ${{
			[css]: {
				filter: "blur(4px)",
				wordBreak: "break-all",
			}
		}}>${pass}</h1>


	`;
}

document.body.append(...Main())