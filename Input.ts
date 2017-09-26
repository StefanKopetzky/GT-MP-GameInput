
API.onServerEventTrigger.connect(function (eventName, args) {
	switch (eventName) {
		case "openInput":
			InputOpen = true;
			BlockControls = true;
			API.disableVehicleEnteringKeys(true);
			API.disableAlternativeMainMenuKey(true);
			API.setCanOpenChat(false);
			TitleText = args[0];
			MaxChars = args[1];
			break;
		case "closeInput":
			InputOpen = false;
			BlockControls = false;
			API.disableVehicleEnteringKeys(false);
			API.disableAlternativeMainMenuKey(false);
			API.setCanOpenChat(true);
			TitleText = "";
			InputText = "";
			MaxChars = 0;
			break; 
	}
});

API.onUpdate.connect(function () {
	if (InputOpen) {
		DrawInput();
		if (BlockControls) {
			API.disableAllControlsThisFrame();
		}
	}
});

// Vars
var InputOpen = false;
var BlockControls = false;
var MaxChars = 0;
var TitleText = "";
var res = API.getScreenResolutionMaintainRatio();
var posX = (res.Width / 2) - 300;
var posY = (res.Height / 2) - 50;
var InputText = "";


function DrawInput() {
	API.drawRectangle(posX, posY, 600, 90, 0, 0, 0, 220);
	API.drawRectangle(posX + 8, posY + 38, 584, 44, 80, 80, 80, 150);
	API.drawRectangle(posX + 10, posY + 40, 580, 40, 20, 20, 20, 200);
	API.drawText(TitleText, posX + 10, posY, 0.5, 255, 255, 255, 255, 6, 0, false, false, 580);
	API.drawText(InputText, posX + 15, posY + 40, 0.5, 255, 255, 255, 255, 6, 0, false, false, 570);
}

var keyBlock = false;
API.onKeyDown.connect(function (sender, e) {
	if (InputOpen) {
		if (!keyBlock) {
			switch (e.KeyCode) {
				case Keys.Enter:
					SendSelection();
					keyBlock = true;
					break;
				case Keys.Back:
					if (InputText.length != 0) {
						InputText = InputText.substring(0, InputText.length - 1);
					}
					break;
				default:
					if (MaxChars == 0) {
						InputText += API.getCharFromKey(e.KeyCode, e.Shift, e.Control, e.Alt);
					} else {
						if (InputText.length >= MaxChars) {} else {
							InputText += API.getCharFromKey(e.KeyCode, e.Shift, e.Control, e.Alt);
						}
					}
					
					break;
			}
		}
	}
})

API.onKeyUp.connect(function (sender, e) {
	keyBlock = false;
})

function SendSelection() {
	TitleText = "";
	InputOpen = false;
	BlockControls = false;
	API.disableVehicleEnteringKeys(false);
	API.disableAlternativeMainMenuKey(false);
	API.setCanOpenChat(true);
	API.triggerServerEvent("inputSelected", InputText);
	InputText = "";
	MaxChars = 0;
}