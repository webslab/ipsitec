import { Jodit } from "jodit/es2021/jodit.min.js";
import { editor } from "$lib/services/editor.ts";

// type File = { type: string; name: string };

const heroPreview = document.getElementById("hero-preview") as HTMLImageElement;
const heroPicker = document.getElementById("hero-picker") as HTMLButtonElement;
const heroModal = document.getElementById("hero-modal")!;
const modalSave = heroModal!.querySelector(".btn-primary")!;
const hero = document.getElementById("hero") as HTMLInputElement;

const fb = new Jodit.modules.FileBrowser({
	// @ts-ignore-start: NOTE:
	theme: editor.getOptions().theme,
	// @ts-ignore-start: NOTE:
	...editor.getOptions().filebrowser,
});

modalSave.addEventListener("click", () => {
	const modalClose = heroModal.querySelector(".btn-secondary") as HTMLButtonElement;
	const select = heroModal.querySelector("select")!;

	if (select.value) {
		const event = new CustomEvent("hero:modal:data", { detail: select.value });
		heroModal.dispatchEvent(event);

		modalClose.click();
	}
});

heroModal.addEventListener("hero:modal:data", (event) => {
	const { detail } = event as CustomEvent;

	hero.value = detail;
	heroPreview.src = detail;
});

heroPicker.addEventListener("click", () => {
	fb.open((images: any) => {
		console.log(images);
	});
});

/**
heroPicker.addEventListener("click", async () => {
	const response = await fetch("/filefind/index.php?action=files", {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"X-WEBSLAB-Project": WEBSLAB_PROJECT,
			"X-WEBSLAB-Token": WEBSLAB_TOKEN, // authService.getToken(),
		},
	});

	response
		.json()
		.then(({ data }) => {
			const heroBody = heroModal.querySelector(".modal-body")!;
			const heroSelect = heroBody.querySelector("select")!;
			const baseurl: string = data.sources[0].baseurl;
			const files: File[] = data.sources[0].files;

			const values: string[] = [];

			files.forEach((file) => {
				if (file.type === "image") {
					values.push(
						`https://${WEBSLAB_PROJECT}.${WEBSLAB_DOMAIN}${baseurl}${file.name}`,
					);
				}
			});

			// clear the select
			heroSelect.innerHTML = "";

			values.forEach((value, index) => {
				const option = document.createElement("option");

				option.value = value;
				option.innerText = files[index].name;

				heroSelect.appendChild(option);
			});

			heroBody.innerHTML = heroSelect.outerHTML;
		});
});
*/
