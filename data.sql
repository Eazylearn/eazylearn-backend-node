INSERT INTO Account(account_id, password, type)
VALUES('19125096', '123', 2),
	  ('19125079', '123', 2),
	  ('thduong', '123', 1),
	  ('vthoang', '123', 1),
	  ('ldhai', '123', 0);
	  
INSERT INTO Student(student_id, student_name, class_id, account_id)
VALUES('19125096', 'Vu Duc Huy', '19CTT2', '19125096'),
	  ('19125079', 'Le Gia Bao', '19CTT2', '19125079');
	  
INSERT INTO Lecturer(lecturer_id, lecturer_name, account_id)
VALUES('thduong', 'Tran Hai Duong', 'thduong'),
	  ('vthoang', 'Vu Thien Hoang', 'vthoang');
	  
INSERT INTO Admin(admin_id, admin_name, account_id)
VALUES('ldhai', 'Le Dinh Hai', 'ldhai');

INSERT INTO Course(course_id, course_name, academic_year, semester)
VALUES('CS161', 'Introduction to Computer Science', '1', 1),
	  ('MTH251', 'Calculus 1', '1', 1),
	  ('CS202', 'Programming Systems', '2', 2),
	  ('CS201', 'Computer System Programming', '2', 2),
	  ('CS300', 'Software Engineering', '3', 1);
	  
INSERT INTO Lecturer_Course(lecturer_id, course_id)
VALUES('thduong', 'CS161'),
	  ('thduong', 'MTH251'),
	  ('thduong', 'CS202'),
	  ('thduong', 'CS201'),
	  ('vthoang', 'CS202'),
	  ('vthoang', 'CS201'),
	  ('vthoang', 'CS300');
	  
INSERT INTO Student_Course(student_id, course_id, status)
VALUES('19125096', 'CS161', 1),
	  ('19125096', 'CS202', 0),
	  ('19125096', 'CS201', 1),
	  ('19125096', 'CS300', 1),
	  ('19125079', 'MTH251', 0),
	  ('19125079', 'CS202', 0),
	  ('19125079', 'CS300', 1);