import { $, h as html, on, css } from "https://esm.sh/libh@0.0.102";

const Main = () => {

	const
		length = $(16),

		use_a_z = $(true),
		use_A_Z = $(true),
		use_1_9 = $(true),
		use_special = $(false),
		special = $("!#$%&'()=~|\`{+*}<>?_"),

		passBaseBuffer = new Uint32Array(1024),

		template = length.tick()
			.or(use_a_z.and("abcdefghijklmnopqrstuvwxyz").or(""))
			.sum(use_A_Z.and("ABCDEFGHIJKLMNOPQRSTUVWXYZ").or(""))
			.sum(use_1_9.and("0123456789").or(""))
			.sum(use_special.and(special).or(""))
			.into($ => Array.from(crypto.getRandomValues(passBaseBuffer)).slice(0, length.$).map(q => $[Math.floor(q * $.length / (2 ** 32 - 1))]).join(""))
	;

	return html`

		<label>Length: ${length}<input ${{ type: "range", value: length, min: 4, max: 1024, [css]: { width: "50%" } }}></label>
		<br>

		<div>
			<label>a ~ z<input ${{ type: "checkbox", checked: use_a_z }}/></label>
			<label>A ~ Z<input ${{ type: "checkbox", checked: use_A_Z }}/></label>
			<label>0 ~ 9<input ${{ type: "checkbox", checked: use_1_9 }}/></label><br>
			<label>Special token: <input ${{ type: "checkbox", checked: use_special }}/></label>
			<input ${{ type: "text", value: special, disabled: use_special.not() }}/>
		</div>

		<!-- <br> -->

		<input ${{
			type: "button",
			value: "copy",
			[on.click]: () => navigator.clipboard.writeText(template.$)
		}}/>

		<h1 ${{
			[css]: {
				filter: "blur(4px)",
				wordBreak: "break-all",
			}
		}}>${template}</h1>


	`;
}

document.body.append(...Main())