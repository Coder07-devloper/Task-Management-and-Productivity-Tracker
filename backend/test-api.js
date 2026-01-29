/**
 * Simple API Test Script
 * 
 * This script automatically tests all backend endpoints.
 * Run it after starting your server: node test-api.js
 * 
 * Make sure your server is running on http://localhost:5000
 */

const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:5000';
let authToken = '';
let userId = '';
let taskId = '';

// Test user credentials
const testUser = {
  email: `test${Date.now()}@example.com`, // Unique email using timestamp
  password: 'testpassword123',
};

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testServerRunning() {
  console.log('\n🧪 Test 1: Checking if server is running...');
  try {
    const response = await makeRequest('GET', '/');
    if (response.status === 200) {
      console.log('✅ Server is running!');
      return true;
    } else {
      console.log('❌ Server returned unexpected status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Cannot connect to server. Make sure it\'s running on port 5000');
    console.log('   Error:', error.message);
    return false;
  }
}

async function testRegister() {
  console.log('\n🧪 Test 2: Registering new user...');
  try {
    const response = await makeRequest('POST', '/api/auth/register', testUser);
    if (response.status === 201 && response.data.token) {
      authToken = response.data.token;
      userId = response.data.userId;
      console.log('✅ User registered successfully!');
      console.log('   Email:', testUser.email);
      console.log('   Token received:', authToken.substring(0, 20) + '...');
      return true;
    } else {
      console.log('❌ Registration failed');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
    return false;
  }
}

async function testLogin() {
  console.log('\n🧪 Test 3: Logging in...');
  try {
    const response = await makeRequest('POST', '/api/auth/login', testUser);
    if (response.status === 200 && response.data.token) {
      authToken = response.data.token;
      console.log('✅ Login successful!');
      console.log('   New token received:', authToken.substring(0, 20) + '...');
      return true;
    } else {
      console.log('❌ Login failed');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return false;
  }
}

async function testCreateTask() {
  console.log('\n🧪 Test 4: Creating a task...');
  try {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task created by the test script',
      priority: 'High',
    };
    const response = await makeRequest('POST', '/api/tasks', taskData, authToken);
    if (response.status === 201 && response.data.task) {
      taskId = response.data.task._id;
      console.log('✅ Task created successfully!');
      console.log('   Task ID:', taskId);
      console.log('   Title:', response.data.task.title);
      console.log('   Priority:', response.data.task.priority);
      console.log('   Status:', response.data.task.status);
      return true;
    } else {
      console.log('❌ Task creation failed');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Task creation error:', error.message);
    return false;
  }
}

async function testGetAllTasks() {
  console.log('\n🧪 Test 5: Getting all tasks...');
  try {
    const response = await makeRequest('GET', '/api/tasks', null, authToken);
    if (response.status === 200 && Array.isArray(response.data.tasks)) {
      console.log('✅ Tasks retrieved successfully!');
      console.log('   Total tasks:', response.data.count);
      return true;
    } else {
      console.log('❌ Get tasks failed');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Get tasks error:', error.message);
    return false;
  }
}

async function testUpdateTask() {
  console.log('\n🧪 Test 6: Updating a task...');
  try {
    const updateData = {
      title: 'Updated Test Task',
      priority: 'Medium',
    };
    const response = await makeRequest('PUT', `/api/tasks/${taskId}`, updateData, authToken);
    if (response.status === 200 && response.data.task) {
      console.log('✅ Task updated successfully!');
      console.log('   New title:', response.data.task.title);
      console.log('   New priority:', response.data.task.priority);
      return true;
    } else {
      console.log('❌ Task update failed');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Task update error:', error.message);
    return false;
  }
}

async function testMarkCompleted() {
  console.log('\n🧪 Test 7: Marking task as completed...');
  try {
    const response = await makeRequest('PATCH', `/api/tasks/${taskId}/complete`, null, authToken);
    if (response.status === 200 && response.data.task.status === 'Completed') {
      console.log('✅ Task marked as completed!');
      console.log('   Status:', response.data.task.status);
      return true;
    } else {
      console.log('❌ Mark completed failed');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Mark completed error:', error.message);
    return false;
  }
}

async function testDeleteTask() {
  console.log('\n🧪 Test 8: Deleting a task...');
  try {
    const response = await makeRequest('DELETE', `/api/tasks/${taskId}`, null, authToken);
    if (response.status === 200 && response.data.success) {
      console.log('✅ Task deleted successfully!');
      return true;
    } else {
      console.log('❌ Task deletion failed');
      console.log('   Status:', response.status);
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.log('❌ Task deletion error:', error.message);
    return false;
  }
}

async function testUnauthorizedAccess() {
  console.log('\n🧪 Test 9: Testing unauthorized access (should fail)...');
  try {
    const response = await makeRequest('GET', '/api/tasks');
    if (response.status === 401) {
      console.log('✅ Unauthorized access correctly blocked!');
      return true;
    } else {
      console.log('❌ Security issue: Unauthorized access was allowed');
      console.log('   Status:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Unauthorized test error:', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Backend API Tests...');
  console.log('=' .repeat(50));

  const results = {
    passed: 0,
    failed: 0,
  };

  // Run tests in sequence
  const tests = [
    { name: 'Server Running', fn: testServerRunning },
    { name: 'Register User', fn: testRegister },
    { name: 'Login User', fn: testLogin },
    { name: 'Create Task', fn: testCreateTask },
    { name: 'Get All Tasks', fn: testGetAllTasks },
    { name: 'Update Task', fn: testUpdateTask },
    { name: 'Mark Completed', fn: testMarkCompleted },
    { name: 'Delete Task', fn: testDeleteTask },
    { name: 'Unauthorized Access', fn: testUnauthorizedAccess },
  ];

  for (const test of tests) {
    const result = await test.fn();
    if (result) {
      results.passed++;
    } else {
      results.failed++;
    }
    // Small delay between tests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary:');
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📈 Total: ${results.passed + results.failed}`);

  if (results.failed === 0) {
    console.log('\n🎉 All tests passed! Your backend is working correctly!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
}

// Start testing
runAllTests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

