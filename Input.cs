using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Managers;

namespace GameInput
{
    public class Input : Script
    {
		[Command("openinput")]
		public void OpenInput(Client sender, string title, int maxChars = 0)
		{
			API.triggerClientEvent(sender, "openInput", title, maxChars);
		}

		[Command("closeinput")]
		public void CloseInput(Client sender)
		{
			API.triggerClientEvent(sender, "closeInput");
		}
	}
}
