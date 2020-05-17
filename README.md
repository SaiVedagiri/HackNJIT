# Textify

## Inspiration
There is nothing more important than an education, and with our ever increasing network of information on the internet, students have the most valuable tool ever known to mankind at their fingertips. In an era where the exchange of data holds an infinite value, it is crucial for everyone to be afforded the opportunity and resources necessary to succeed. However, for many students seeking an education in poorer countries, their access to internet is limited by steep mobile data prices and scarce WiFi access. However, while data can cost as much as $75 a gigabyte in these countries, cheap and even free SMS plans are widely accessable. Statistics show that 6 billion SMS messages are sent each day and we imagined a way to access the internet and even view full webpages simply by sending SMS message, requiring absolutely no data or WiFi connection. 

## What it does
Textify offers the 11 core features that gives the user text, image, and URL based internet access. For users who are roaming, cannot get a reliable internet connection, or are on an airplane offering only SMS service, Textify offers a quick and efficient way to access and navigate through the internet. For users who cannot afford data plans and do not have reliable WiFi access, Textify provides the invaluable asset to the world's largest source of information. 

We provide the following features: 
1. Web search via Bing Search and Microsoft Cognitive Text Analytics
2. URL search via Web Screen Capture
3. Get info on topic via Wikipedia
4. Stock information via Wall Street Journal
5. Directions via Google Cloud Directions
6. Weather data via Open Weather Map
7. Translate text via Microsoft Translate
8. Restaurant recommendations via Yelp Business Search
9. GIF search via Giphy

## How we built it
We used the Twilio API to receive and send SMS messages from the user through our express node.js script running on the Azure backend. All information collected from the user is processed by our text parsing algorithms to find the best way to communicate with the user. Based on user requests and parameters, various search methods are used to collect the information and our processing algorithm formats the return JSON into a return SMS based on user preference. We created our own custom natural language processing chatbot to prompt the user with followup questions. For the web images, we used Bing Search to query the users search parameters and an web screenshot API to save this image, where the returned PNG image is saved locally and sent back to the user via MMS image. We used multiple artificial intelligence based natural language processing algorithms to analyze the key words of queries and sentiment analysis of the top articles to display only accurate and positive web pages to the user.  

## Challenges we ran into
While text-based SMS send/return was fairly straightforward, we ran into several challenges when sending images of the web page as a response. To solve this, we combined Bing Search API with a web screenshot API to save a local image. We ran into another problem when attempting to access these locally stored PNG images in the backend Azure server, but we solved this problem by hosting the image. Lastly, we had to deal with several web hosting outages and WiFi restrictions on our server, but we eventually created a reliable connection between front end SMS app and backend Azure server.

## Accomplishments that we're proud of
We are extremely proud that we successfully created a project with real world implications. Each of our team members has relied on the internet in different ways to enhance our education and we truly believe that everyone deserves an affordable and reliable internet connection regardless of background. On top of the core web browsing functionality, we are proud that we were able to integrate several features that are useful for everyone. We came into this hackathon with an idea and absolutely no work done, so we are the most proud that we were able to divide the work to suit our individual strengths and create a functional and well rounded project.

## What we learned
This was our first time using Twilio API and many of the feature search medhods. Because multiple API calls were needed to complete our project, we learned how to effectively and safely process these calls on multiple threads. We also learned how to specifically utilize the Twilio API in conjunction with a backend node.js script to receive, analyze, and send SMS messages. Both of these acquired skills will undoubtadly aid us in future projects. 

## What's next for Textify
We hope to work on the backend to support more corrent users. By doing so, Textify can truly be used as a valuable tool all over the world to access the internet via SMS. We had a GREAT time at HackNJIT and can't wait to continue learning and hacking! Thanks for the amazing experience!
