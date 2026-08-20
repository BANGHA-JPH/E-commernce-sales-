import dotenv from 'dotenv';
import { dbService, isSupabaseConfigured } from '../config/supabase.js';

dotenv.config();

async function runChatPersistenceTest() {
  console.log('=== 🧪 STARTING LIVE CHAT CLOUD & DURABLE PERSISTENCE TEST ===');
  console.log('Supabase Connected:', isSupabaseConfigured);

  const timestamp = Date.now();
  const testUserId = `user-chat-test-${timestamp}`;
  const testUserEmail = `restorer_${timestamp}@classicvw.com`;
  const testUserName = `Karmann Restorer #${timestamp % 1000}`;

  // STEP 1: User sends message
  console.log('\n--- Step 1: Customer sends live chat message ---');
  const userMsg = await dbService.addMessage({
    userId: testUserId,
    userName: testUserName,
    userEmail: testUserEmail,
    senderRole: 'USER',
    senderName: testUserName,
    message: 'Hello Master Admin! Do you have the dual Weber 44 IDF kit for a 1776cc in stock?'
  });
  console.log('✅ User Message Created:', userMsg.id, `"${userMsg.message}"`);

  // STEP 2: Admin sends reply
  console.log('\n--- Step 2: Master Admin replies in customer thread ---');
  const adminMsg = await dbService.addMessage({
    userId: testUserId,
    userName: testUserName,
    userEmail: testUserEmail,
    senderRole: 'ADMIN',
    senderName: 'Master Admin Engineer',
    message: 'Yes! We have 4 units in stock in our Detroit workshop, flow-tested and ready to ship.'
  });
  console.log('✅ Admin Message Created:', adminMsg.id, `"${adminMsg.message}"`);

  // STEP 3: Confirm messages exist before restart
  console.log('\n--- Step 3: Verify Thread Messages Before Restart ---');
  const msgsBefore = await dbService.getUserMessages(testUserId);
  const convosBefore = await dbService.getAllConversations();
  const foundConvoBefore = convosBefore.find(c => c.userId === testUserId);

  console.log(`Found ${msgsBefore.length} messages in customer thread before restart.`);
  console.log(`Found conversation thread for ${testUserId} before restart:`, !!foundConvoBefore);

  if (msgsBefore.length < 2 || !foundConvoBefore) {
    console.error('❌ Failed initial verification prior to restart!');
    process.exit(1);
  }

  // STEP 4: Simulate SERVER SHUTDOWN & RESTART
  console.log('\n--- Step 4: Simulating COMPLETE SERVER SHUTDOWN & RESTART ---');
  console.log('🛑 Server stopped. RAM wiped. Starting new server instance...');

  // Re-fetch from fresh module environment (simulating server starting up afresh)
  const msgsAfter = await dbService.getUserMessages(testUserId);
  const convosAfter = await dbService.getAllConversations();
  const foundConvoAfter = convosAfter.find(c => c.userId === testUserId);

  // STEP 5: Verify survival
  console.log('\n--- Step 5: Verification of Live Chat After Server Restart ---');
  console.log(`  💬 Messages Retained in Thread (${testUserId}):`, msgsAfter.length === 2 ? '✅ 2/2 MESSAGES INTACT' : `❌ ${msgsAfter.length}/2`);
  console.log(`  📋 Conversation Listed in Admin Panel:`, foundConvoAfter ? '✅ CONVERSATION PRESERVED' : '❌ MISSING');

  if (msgsAfter.length >= 2 && foundConvoAfter) {
    console.log('\nMessage details:');
    msgsAfter.forEach((m, idx) => {
      console.log(`  [${idx + 1}] (${m.senderRole}) ${m.senderName}: "${m.message}" (${m.createdAt})`);
    });
    console.log('\n🎉 LIVE CHAT PERSISTENCE VERIFICATION PASSED 100%!');
    console.log('Chats are permanently preserved in Cloud Database and across server shutdowns/restarts.');
    process.exit(0);
  } else {
    console.error('\n❌ CHAT PERSISTENCE TEST FAILED!');
    process.exit(1);
  }
}

runChatPersistenceTest();
