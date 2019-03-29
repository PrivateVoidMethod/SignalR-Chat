using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Models
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            var m = new Message { User = user, UserMessage = message };
          
            await Clients.Others.SendAsync("ReceiveMessage", m);

        }
    }

}
