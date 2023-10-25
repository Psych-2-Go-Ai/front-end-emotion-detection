# Emotion Detection

We uses machine learning to detect emotions and depression in audio files. With a focus on simplicity and effectiveness, our project enhances mental health assessments and human-computer interaction. We use advanced techniques to analyze speech signals and provide reliable emotion and depression recognition.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up](#setting-up)
  - [Supabase Setup](#supabase-setup)
  - [Hugging Face Model Deployment](#hugging-face-model-deployment)
  - [OpenAI API Setup](#openai-api-setup)
- [Hosting Server Setup](#hosting-server-setup)
  - [Using Name Domain](#using-name-domain)
  - [Hosting on an EC2 Public Address](#hosting-on-an-ec2-public-address)
  - [Local Host](#local-host)
- [Frontend Deployment](#frontend-deployment)
  - [Setting Environment Variables](#setting-environment-variables)
  - [Cloning the Repository](#cloning-the-repository)
  - [Deploying the Application](#deploying-the-application)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Supabase Account
- Hugging Face Emotion Detection Model
- OpenAI Chat API Key
- Node and Npm
- Name Domain (Optional)
- Aws EC2 Instance (Optional)

## Setting Up

### Supabase Setup

1. Create a Supabase account and a new project.
2. Set up a database within your Supabase project.
3. Use the connection string provided by Supabase to link the database to your project.
4. Create a table with the following schema:

```sql
-- Create a table for users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userId UUID NOT NULL,
  name VARCHAR(255),
  age INT,
  gender VARCHAR(10),
  emotion VARCHAR(255),
  depression NUMERIC(5, 2),
  timestamp TIMESTAMP
);
```

5. In your Supabase project, navigate to the project settings.
6. Select the "Auth" section.
7. In the "Redirect URL" field, set the appropriate redirect URL for your environment:
   - For local development, use "http://localhost:3000" or your local host URL.
   - For your own domain, use the URL pointing to your hosted application.
   - For an EC2 instance, use the public URL of the instance.


### Hugging Face Model Deployment

Refer to the [Hugging Face Model Repository](https://github.com/Psych-2-Go-Ai/emotion-detection) for instructions on setting up the Emotion Detection model and obtaining the required API and Auth Token.

### OpenAI API Setup

To obtain your OpenAI Chat API Key, please follow the instructions provided by OpenAI on their official website [here](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key).

## Hosting Server Setup

Host the application using one of the following options:
  - [Using Name Domain](#using-name-domain)
  - [Hosting on an EC2 Public Address](#hosting-on-an-ec2-public-address)
  - [Local Host](#local-host)

### Using Name Domain

1. Purchase a domain name from a domain registrar.
2. Set up an ssh EC2 Instance on Aws.
3. Configure DNS forwarding on your hosting provider to link your domain with your SSH instance.
4. Start the Apache server on your instance with virtual host.

You can follow this [YouTube video](https://youtu.be/Irv5Ab4qGcE?si=nnUOMal79HoWiJqf) for detailed instructions.

Once everything is set up, open your domain in a web browser. You should see a page like this.

![Success Page Domain](https://github.com/Psych-2-Go-Ai/front-end-emotion-detection/assets/104954857/50aaf706-c117-43fb-833d-1f7e07ef47b6)

If all good move on to [Frontend Deployment](#frontend-deployment).

### Hosting on an EC2 Public Address

1. Create an EC2 instance on AWS with the Ubuntu distribution. You can follow [this](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) Article.
2. Install Apache2 and enable necessary modules with these commands:

    ```bash
    sudo apt update
    sudo apt install apache2
    sudo a2enmod ssl proxy proxy_http headers rewrite
    ```

3. Restart the Apache2 service:

    ```bash
    sudo systemctl restart apache2
    ```

Once everything is set up, open your domain in a web browser. You should see a apache success page like this.

![Success Page Ec2](https://github.com/Psych-2-Go-Ai/front-end-emotion-detection/assets/104954857/64612982-0955-4afe-9948-9cc100d2d5c3)

If all good move on to [Frontend Deployment](#frontend-deployment).

### Local Host

No additional setup is needed for local hosting.

## Frontend Deployment

### Setting Environment Variables

1. Duplicate the `.env.example` file provided in the project to create a new file called `.env`.

2. Fill in the required values in the `.env` file based on the following instructions. You should have obtained these values during the setup steps:

   - `NEXT_PUBLIC_FRONTEND_URL`: Replace this with your public site URL. It can be a domain, a server address, or "localhost," depending on your hosting choice.
   - `NEXT_PUBLIC_OPEN_CHAT_API_KEY`: Follow OpenAI's instructions to obtain an API key and replace this with your Chat API key.
   - `NEXT_PUBLIC_EMOTION_DETECTION_API`: The URL of your Hugging Face emotion detection model API.
   - `NEXT_PUBLIC_EMOTION_DETECTION_AUTH_TOKEN`: If your model API requires an authorization token, include it here.
   - `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project.
   - `NEXT_PUBLIC_SUPABASE_KEY`: Your Supabase project's anonymous key.



### Cloning the Repository

Clone the project repository from the organization.

```bash
git clone https://github.com/Psych-2-Go-Ai/front-end-emotion-detection.git
```

### Deploying the Application

Create a Swap file
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Install the required packages

```bash
sudo npm install
sudo npm install -g pm2 react next
```

Buil and start the application.

```bash
sudo npm run build
pm2 start npm --name "emotion detection" -- start --watch
```

View logs with `pm2 logs`.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork the project.
2. Create a new branch for your changes.
3. Make your desired changes.
4. Push your changes to your fork.
5. Create a pull request to merge your changes.

That's it! Your contributions are appreciated.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
