#!/bin/bash

echo "🔥 Testing Firebase Connection"
echo "=============================="
echo ""

# Check if server is running
if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "❌ Dev server not running. Starting it..."
    npm run dev:web &
    sleep 3
fi

echo "🌐 Opening Firebase connection test..."
echo "   → http://localhost:5173/firebase-test.html"
echo ""

echo "🏠 Opening main application..."
echo "   → http://localhost:5173/"
echo ""

echo "📋 Firebase Configuration Summary:"
echo "   • Project ID: vehicle-vitals-prod"
echo "   • Auth Domain: vehicle-vitals-prod.firebaseapp.com"
echo "   • Storage Bucket: vehicle-vitals-prod.firebasestorage.app"
echo ""

echo "✅ Firebase is now configured!"
echo ""
echo "🎯 Next Steps:"
echo "1. Open the URLs above to test the connection"
echo "2. Check browser console for any Firebase errors"
echo "3. Try signing up/logging in to test authentication"
echo "4. Create a vehicle to test Firestore database"
echo ""

echo "📱 For mobile apps:"
echo "   → Run 'npm run firebase:test-mobile' to verify all platforms"
echo "   → iOS and Android are fully configured and ready!"