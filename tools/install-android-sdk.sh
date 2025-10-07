#!/bin/bash
# Quick Android SDK setup for development containers

echo "🤖 Setting up Android SDK..."

# Set environment variables
export ANDROID_HOME="$HOME/android-sdk"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools"

# Create Android SDK directory
mkdir -p $ANDROID_HOME/cmdline-tools

# Download command line tools
cd $ANDROID_HOME/cmdline-tools
wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip -q commandlinetools-linux-11076708_latest.zip
mv cmdline-tools latest
rm commandlinetools-linux-11076708_latest.zip

# Accept licenses and install essential packages
yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Configure Flutter
flutter config --android-sdk $ANDROID_HOME

echo "✅ Android SDK setup complete!"
echo "📱 You can now run: flutter run -d android"
echo ""
echo "Add these to your shell profile:"
echo "export ANDROID_HOME=$HOME/android-sdk"
echo "export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools"