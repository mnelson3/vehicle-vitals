#!/bin/bash

# Firebase Connection Diagnostic Tool
echo "🔍 Firebase Connection Diagnostic"
echo "================================="
echo ""

# Check if .env.local exists
if [ -f "web/.env.local" ]; then
    echo "✅ web/.env.local exists"
    
    # Check if it has real values (not placeholders)
    if grep -q "YOUR_API_KEY\|REPLACE_WITH" web/.env.local; then
        echo "❌ web/.env.local contains placeholder values"
        echo "   → Copy real Firebase config values from Firebase Console"
    else
        echo "✅ web/.env.local appears to have real values"
    fi
else
    echo "❌ web/.env.local is missing"
    echo "   → Copy web/.env.example to web/.env.local"
    echo "   → Add your Firebase project configuration"
fi

echo ""

# Check Firebase CLI
if command -v firebase &> /dev/null; then
    echo "✅ Firebase CLI is installed"
    
    # Check if project is initialized
    if [ -f ".firebaserc" ]; then
        echo "✅ Firebase project is initialized"
        echo "   Project: $(cat .firebaserc | grep '"default"' | cut -d'"' -f4)"
    else
        echo "⚠️  Firebase project not initialized"
        echo "   → Run: firebase login && firebase use --add"
    fi
else
    echo "❌ Firebase CLI not installed"
    echo "   → Run: npm install -g firebase-tools"
fi

echo ""

# Check Node.js modules
if [ -d "web/node_modules/firebase" ]; then
    echo "✅ Firebase SDK installed"
else
    echo "❌ Firebase SDK not found"
    echo "   → Run: ./install.sh"
fi

echo ""

# Check if dev server is running
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Dev server is running at http://localhost:5173"
    echo "   → Test connection at http://localhost:5173/firebase-test.html"
else
    echo "⚠️  Dev server is not running"
    echo "   → Run: npm run dev:web"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Fix any ❌ issues above"
echo "2. Run: npm run dev:web"
echo "3. Open: http://localhost:5173/firebase-test.html"
echo "4. Check browser console for Firebase errors"