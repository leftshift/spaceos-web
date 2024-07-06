const screen = document.getElementById('screen');
const input = document.getElementById('command');
const sendButton = document.getElementById('send-button');

Module.onRuntimeInitialized = () => {
	const handle_input = Module.cwrap('handle_input', 'string', ['string']);

	let prevInput = "";

	function handleCommand(command) {
		if (command == '') return;
		const result = handle_input(command);
		screen.textContent = result;
	}

	function onSubmit() {
		const command = input.value;
		input.value = "";
		prevInput = command;
		handleCommand(command);
	}

	input.addEventListener("keydown", () => {
		if (event.key === "Enter") {
			onSubmit();
		} else if (event.key === "ArrowUp") {
			input.value = prevInput;
			event.preventDefault();
		}
	});

	sendButton.addEventListener("click", () => {
		onSubmit();
	});

	// show initial prompt manually
	handleCommand("prompt");
};

Module.onAbort = () => {
  screen.textContent = "WebAssembly aborted or \n"
  + "failed to initialize.\n\n"
  + "Try enabling JavaScript JIT"
  + "or use a different browser.";
}
