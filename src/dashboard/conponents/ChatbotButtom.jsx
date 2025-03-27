import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react'; // Import icons from lucide-react

const ChatbotButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 z-50 p-2 bg-white rounded-full shadow-lg"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                    <zapier-interfaces-chatbot-embed
                        is-popup='false'
                        chatbot-id='cm8rhniz3000f3mc63gui8bxm'
                        height='600px'
                        width='400px'
                    />
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default ChatbotButton;
