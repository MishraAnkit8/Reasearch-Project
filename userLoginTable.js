
CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255), -- Note: You should use a more secure password storage method
    active BOOLEAN DEFAULT true
);


CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) UNIQUE,
    active BOOLEAN DEFAULT true
);

CREATE TABLE user_roles (
    user_lid INTEGER REFERENCES user_info(id),
    role_lid INTEGER REFERENCES roles(role_id),
    active BOOLEAN DEFAULT true
);

CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    module_name VARCHAR(255),
    url VARCHAR(255),
    photo VARCHAR(255), -- Assuming this is a path or URL to a photo
    parent_moduleid INTEGER REFERENCES modules(id),
    active BOOLEAN DEFAULT true
);

CREATE TABLE module_mapping (
    role_id INTEGER REFERENCES roles(role_id),
    module_id INTEGER REFERENCES modules(id),
    active BOOLEAN DEFAULT true
);



-- Inserting sample data into user_info table
INSERT INTO user_info (firstname, lastname, email, username, password)
VALUES 
    ('ankit', 'mishra', 'ankit.mishra10021997@gmial.com', 'ankit', '$argon2d$v=19$m=12,t=3,p=1$Y3hvaGhjZmo1Y2UwMDAwMA$VzcINUsVf+qwxyBTeBwtSw'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'jane_smith', '$argon2d$v=19$m=12,t=3,p=1$Y3hvaGhjZmo1Y2UwMDAwMA$VzcINUsVf+qwxyBTeBwtSw'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'alice_johnson', '$argon2d$v=19$m=12,t=3,p=1$Y3hvaGhjZmo1Y2UwMDAwMA$VzcINUsVf+qwxyBTeBwtSw');
	
-- Inserting sample data into roles table
INSERT INTO roles (role_name) VALUES ('Admin'), ('Faculty'), ('Student');

-- Inserting sample data into user_roles table
INSERT INTO user_roles (user_lid, role_lid)
VALUES 
    (2, 2),  -- John Doe is an Admin
    (1, 1),  -- Jane Smith is a Faculty
    (3, 3);  -- Alice Johnson is a Student

-- Inserting sampl
select * from user_info


select * from user_info;


INSERT INTO modules (module_name, url, photo, parent_moduleid)
VALUES 
    ('Admin Dashboard', '/admin', '/images/admin.jpg', NULL),
    ('Faculty Dashboard', '/faculty', '/images/faculty.jpg', NULL),
    ('Student Dashboard', '/student', '/images/student.jpg', NULL),
    ('Profile', '/profile', '/images/profile.jpg', 1); -- Profile is a child of Admin Dashboard
	
INSERT INTO module_mapping (role_id, module_id)
VALUES 
    (2, 2),  -- Admin has access to Admin Dashboard
    (1, 1),  -- Faculty has access to Faculty Dashboard
    (3, 3); 


https://github.com/harshalnmims/OpenElective git hub link
