/**
 * EcoVators AI Chatbot for Agricultural Advice
 * Provides farmers with sustainable farming tips and answers questions
 */

const AIChatbot = {
    // Initialize the chatbot
    init: function() {
        this.createChatbotUI();
        this.setupEventListeners();
        console.log('AI Chatbot initialized');
    },

    // Create the chatbot UI
    createChatbotUI: function() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <div class="chatbot-header">
                    <h3><i class="fas fa-robot"></i> EcoBot Assistant</h3>
                    <button class="chatbot-toggle"><i class="fas fa-minus"></i></button>
                </div>
                <div class="chatbot-body">
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                Hello! I'm EcoBot, your sustainability buddy. How can I help you today?
                            </div>
                            <div class="message-time">Just now</div>
                        </div>
                    </div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbot-input-field" placeholder="Ask about sustainability topics...">
                        <button id="chatbot-send"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
            <button class="chatbot-button" id="open-chatbot">
                <i class="fas fa-robot"></i>
            </button>
        `;

        // Append chatbot to the body
        const chatbotContainer = document.createElement('div');
        chatbotContainer.innerHTML = chatbotHTML;
        document.body.appendChild(chatbotContainer);

        // Add CSS for the chatbot
        const chatbotStyles = document.createElement('style');
        chatbotStyles.textContent = `
            .chatbot-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #4CAF50;
                color: white;
                border: none;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                transition: all 0.3s ease;
            }
            
            .chatbot-button:hover {
                transform: scale(1.1);
                background-color: #388E3C;
            }
            
            .chatbot-container {
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 350px;
                height: 450px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                display: none;
                flex-direction: column;
                overflow: hidden;
            }
            
            .chatbot-container.active {
                display: flex;
            }
            
            .chatbot-header {
                padding: 15px;
                background-color: #4CAF50;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chatbot-header h3 {
                margin: 0;
                font-size: 16px;
            }
            
            .chatbot-toggle {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 16px;
            }
            
            .chatbot-body {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 15px;
                overflow: hidden;
            }
            
            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding-right: 5px;
            }
            
            .message {
                margin-bottom: 15px;
                max-width: 80%;
            }
            
            .user-message {
                margin-left: auto;
                text-align: right;
            }
            
            .bot-message {
                margin-right: auto;
            }
            
            .message-content {
                padding: 10px 15px;
                border-radius: 18px;
                display: inline-block;
                word-break: break-word;
            }
            
            .user-message .message-content {
                background-color: #E3F2FD;
                color: #0D47A1;
            }
            
            .bot-message .message-content {
                background-color: #F1F1F1;
                color: #333;
            }
            
            .message-time {
                font-size: 11px;
                color: #999;
                margin-top: 5px;
            }
            
            .chatbot-input {
                display: flex;
                margin-top: 15px;
                border-top: 1px solid #eee;
                padding-top: 15px;
            }
            
            .chatbot-input input {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
            }
            
            .chatbot-input button {
                background-color: #4CAF50;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-left: 10px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            
            .chatbot-input button:hover {
                background-color: #388E3C;
            }
            
            @media (max-width: 480px) {
                .chatbot-container {
                    width: 90%;
                    right: 5%;
                    left: 5%;
                    bottom: 80px;
                }
            }
        `;
        document.head.appendChild(chatbotStyles);
    },

    // Set up event listeners for chatbot interactions
    setupEventListeners: function() {
        // Open chatbot
        document.getElementById('open-chatbot').addEventListener('click', () => {
            document.querySelector('.chatbot-container').classList.add('active');
            document.getElementById('open-chatbot').style.display = 'none';
        });

        // Toggle chatbot minimize
        document.querySelector('.chatbot-toggle').addEventListener('click', () => {
            document.querySelector('.chatbot-container').classList.remove('active');
            document.getElementById('open-chatbot').style.display = 'flex';
        });

        // Send message
        document.getElementById('chatbot-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        document.getElementById('chatbot-input-field').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    },

    // Send a message to the chatbot
    sendMessage: function() {
        const inputField = document.getElementById('chatbot-input-field');
        const message = inputField.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input field
        inputField.value = '';
        
        // Process the message and get a response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    },

    // Add a message to the chat
    addMessage: function(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        
        // Scroll to the bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },

    // Generate a response based on the user's message
    generateResponse: function(message) {
        message = message.toLowerCase();
        
        // Simple rule-based responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! What sustainability topic are you learning today?";
        }
        
        if (message.includes('thank')) {
            return "You're welcome! Feel free to ask if you have more questions.";
        }
        
        // Sustainability-related responses
        if (message.includes('sustainability') || message.includes('green practices')) {
            return "Sustainability means using resources wisely so the environment, society, and economy can benefit long-term. Want a quick note for your exam or project?;
        }
        
        if (message.includes('problems') || message.includes('issues')) {
            return "Environmental issues like pollution, waste generation, and plastic use are major topics in sustainability studies. Want solutions for school-level assignments or presentations?";
        }
        
        if (message.includes('save water') || message.includes('conserve') || message.includes('scarcity')) {
            return "You can save water by taking shorter showers, turning off the tap while brushing teeth, and only running washing machines and dishwashers with full loads.";
        }
        
        if (message.includes('soil') || message.includes('formation')) {
            return "Soil forms over long periods through a process called weathering, where rocks are broken down by physical, chemical, and biological agents";
        }
        
        if (message.includes('climate') || message.includes('change')) {
            return "Climate change is the term used to describe changes in the state of the climate that can be identified by changes in the average and/or the variability of its properties and that persists for an extended period, typically decades or longer.";
        }
        
        if (message.includes('global') || message.includes('warming')) {
            return "Global warming is the long-term increase in Earth's average surface temperature, primarily caused by human activities like burning fossil fuels and deforestation";
        }
        
        if (message.includes('project') || message.includes('assignment') || message.includes('topic')) {
            return "I can help you with project ideas, working models, charts, or quick study notes on any sustainability topic. What do you need?";
        }
        
        // Default response
        return "That’s a nice question! I might not have that exact topic ready, but I can help with climate topics, soil health, water conservation, or project guidance. What would you like to learn?";
    }
};

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    AIChatbot.init();
});
