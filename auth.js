// Authentication System
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'magic123';
const AUTH_KEY = 'magicalRecipeAuth';
const CURRENT_USER_KEY = 'magicalRecipeCurrentUser';
const USERS_KEY = 'magicalRecipeUsers';
const LOGIN_ATTEMPTS_KEY = 'magicalRecipeLoginAttempts';
const LOCKOUT_TIME_KEY = 'magicalRecipeLockoutTime';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Initialize default admin user
function initializeUsers() {
    const users = getUsers();
    if (users.length === 0) {
        // Add default admin user
        const adminUser = {
            username: ADMIN_USERNAME,
            password: ADMIN_PASSWORD,
            email: 'admin@magicalrecipes.com',
            isAdmin: true,
            createdAt: new Date().toISOString()
        };
        users.push(adminUser);
        saveUsers(users);
    }
}

// Get all users
function getUsers() {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
}

// Save users
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Get current logged in user
function getCurrentUser() {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

// Set current logged in user
function setCurrentUser(user) {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        localStorage.setItem(AUTH_KEY, 'true');
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(AUTH_KEY);
    }
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === 'true' && getCurrentUser() !== null;
}

// Register new user
function register(username, password, email) {
    const users = getUsers();
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        return { success: false, message: 'Username already exists!' };
    }
    
    // Check if email already exists
    if (email && users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered!' };
    }
    
    // Validate password length
    if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters!' };
    }
    
    // Validate username length
    if (username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters!' };
    }
    
    // Create new user
    const newUser = {
        username: username,
        password: password, // In production, this should be hashed
        email: email || '',
        isAdmin: false,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, message: 'Registration successful! You can now login.' };
}

// Get login attempts for a username
function getLoginAttempts(username) {
    const attemptsJson = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    const attempts = attemptsJson ? JSON.parse(attemptsJson) : {};
    return attempts[username] || { count: 0, lastAttempt: null };
}

// Save login attempts for a username
function saveLoginAttempts(username, count) {
    const attemptsJson = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    const attempts = attemptsJson ? JSON.parse(attemptsJson) : {};
    attempts[username] = {
        count: count,
        lastAttempt: new Date().toISOString()
    };
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
}

// Clear login attempts for a username
function clearLoginAttempts(username) {
    const attemptsJson = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    const attempts = attemptsJson ? JSON.parse(attemptsJson) : {};
    delete attempts[username];
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
}

// Get lockout time for a username
function getLockoutTime(username) {
    const lockoutJson = localStorage.getItem(LOCKOUT_TIME_KEY);
    const lockouts = lockoutJson ? JSON.parse(lockoutJson) : {};
    return lockouts[username] || null;
}

// Set lockout time for a username
function setLockoutTime(username) {
    const lockoutJson = localStorage.getItem(LOCKOUT_TIME_KEY);
    const lockouts = lockoutJson ? JSON.parse(lockoutJson) : {};
    lockouts[username] = new Date().getTime();
    localStorage.setItem(LOCKOUT_TIME_KEY, JSON.stringify(lockouts));
}

// Clear lockout time for a username
function clearLockoutTime(username) {
    const lockoutJson = localStorage.getItem(LOCKOUT_TIME_KEY);
    const lockouts = lockoutJson ? JSON.parse(lockoutJson) : {};
    delete lockouts[username];
    localStorage.setItem(LOCKOUT_TIME_KEY, JSON.stringify(lockouts));
}

// Check if account is locked out
function isAccountLocked(username) {
    const lockoutTime = getLockoutTime(username);
    if (!lockoutTime) return { locked: false };

    const currentTime = new Date().getTime();
    const timePassed = currentTime - lockoutTime;

    if (timePassed >= LOCKOUT_DURATION) {
        // Lockout period has passed, clear the lockout
        clearLockoutTime(username);
        clearLoginAttempts(username);
        return { locked: false };
    }

    const remainingTime = LOCKOUT_DURATION - timePassed;
    const remainingMinutes = Math.ceil(remainingTime / (60 * 1000));
    return {
        locked: true,
        remainingMinutes: remainingMinutes,
        remainingTime: remainingTime
    };
}

// Login function
function login(username, password) {
    // Check if account is locked
    const lockStatus = isAccountLocked(username);
    if (lockStatus.locked) {
        return {
            success: false,
            locked: true,
            message: `Account is locked. Please try again in ${lockStatus.remainingMinutes} minutes.`,
            remainingMinutes: lockStatus.remainingMinutes
        };
    }

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login - clear attempts
        clearLoginAttempts(username);
        clearLockoutTime(username);
        setCurrentUser(user);
        return { success: true };
    } else {
        // Failed login - increment attempts
        const attempts = getLoginAttempts(username);
        const newAttemptCount = attempts.count + 1;

        if (newAttemptCount >= MAX_LOGIN_ATTEMPTS) {
            // Lock the account
            setLockoutTime(username);
            saveLoginAttempts(username, newAttemptCount);
            return {
                success: false,
                locked: true,
                message: `Too many failed attempts. Account locked for 30 minutes.`,
                remainingMinutes: 30
            };
        } else {
            // Save the attempt
            saveLoginAttempts(username, newAttemptCount);
            const attemptsLeft = MAX_LOGIN_ATTEMPTS - newAttemptCount;
            return {
                success: false,
                locked: false,
                message: `Invalid username or password! ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining.`,
                attemptsLeft: attemptsLeft
            };
        }
    }
}

// Logout function
function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

// Require authentication (redirect to login if not logged in)
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Update UI based on login status
function updateAuthUI() {
    const isLoggedIn = localStorage.getItem(AUTH_KEY) === 'true';
    const loginBtn = document.getElementById('loginBtn');
    const adminBtn = document.getElementById('adminBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    }
    if (adminBtn) {
        adminBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    }
    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    }
}

// Initialize users on load
initializeUsers();

// Initialize auth UI on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthUI);
} else {
    updateAuthUI();
}

