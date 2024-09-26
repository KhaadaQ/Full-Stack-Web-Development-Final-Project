const emailSignupTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f0f4f8;
            margin: 0;
            padding: 0;
        }

        .container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid #d6d6d6;
        }

        .header {
            background-color: #007bff;
            padding: 10px 20px;
            text-align: center;
            color: #ffffff;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }

        .header img {
            max-height: 50px;
            margin-bottom: 10px;
        }

        h1 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 10px;
        }

        p {
            color: #555555;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .features-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        .features-list li {
            background-color: #f0f4f8;
            margin-bottom: 10px;
            padding: 10px 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
        }

        .features-list li img {
            height: 30px;
            margin-right: 10px;
        }

        .button {
            background-color: #28a745;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            font-size: 16px;
            margin-top: 20px;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #aaaaaa;
        }

        .footer a {
            color: #007bff;
            text-decoration: none;
        }

        .footer p {
            margin: 5px 0;
        }

        .social-icons {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 15px;
        }

        .social-icons img {
            height: 30px;
        }

    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://picsum.photos/20/30" alt="Website Logo">
            <h1>Welcome to {{your_website_name}}!</h1>
        </div>
        <div class="content">
            <p>Hi {{name}},</p>
            <p>Thank you for joining us! We're thrilled to have you as part of our community. Here's what you can explore:</p>
            <ul class="features-list">
                <li><img src="https://picsum.photos/20/30" alt="Feature 1"> Amazing new features tailored for you</li>
                <li><img src="https://picsum.photos/20/30" alt="Feature 2"> Update your profile and customize your experience</li>
                <li><img src="https://picsum.photos/20/30" alt="Feature 3"> Stay up-to-date with our latest news and content</li>
            </ul>
            <p>If you need assistance or have any questions, feel free to <a href="[Contact URL]">contact us</a>.</p>
            <a href="[Your Website URL]" class="button">Start Exploring</a>
        </div>
        <div class="social-icons">
            <a href="https://facebook.com"><img src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-1.png" alt="Facebook"></a>
            <a href="https://twitter.com"><img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-3.png" alt="Twitter"></a>
            <a href="https://instagram.com"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram"></a>
        </div>
        <div class="footer">
            <p>&copy; 2024 {{your_website_name}}. All rights reserved.</p>
            <p>If you didn't register for this account, please <a href="[Unsubscribe URL]">unsubscribe</a>.</p>
        </div>
    </div>
</body>

</html>
`;

module.exports = emailSignupTemplate;
