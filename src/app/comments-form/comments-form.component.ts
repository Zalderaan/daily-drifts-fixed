import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommentsFService } from '../services/comments-f.service';
import { BlogFService } from '../services/blog-f.service';
import { AuthFService } from '../services/auth-f.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments-form',
  standalone: true,
  imports: [QuillModule, MatCardModule, MatButtonModule, MatInputModule, 
            MatFormField, ReactiveFormsModule, CommonModule],
  templateUrl: './comments-form.component.html',
  styleUrl: './comments-form.component.css'
})
export class CommentsFormComponent implements OnInit {
  guestPlaceholder = 'Please login to comment';
  placeholder = 'Write a comment...';
  comment = '';
  commentForm: FormGroup = new FormGroup({});
  quillConfig = {
    modules: {
      toolbar: [] // Empty array to hide all the toolbar
    }
  }
  currentUserId: number | null = null;

  @Output() commentAdded = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private commentsFService: CommentsFService,
    private blogFService: BlogFService,
    private authFService: AuthFService
  ) { 
    this.commentForm = this.formBuilder.group({
      comment_body: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.blogFService.getCurrentUserId();
  }

  onComment() {
    // console.log(this.commentForm.value);
    if (this.commentForm.valid) {
      const comment_body = this.commentForm.value.comment_body;
      const comment_blog_id = this.activatedRoute.snapshot.params['id'];
      console.log('Blog ID on comment: ', comment_blog_id);

      this.commentsFService.makeComment(comment_body, comment_blog_id).subscribe(
        (response) => {
          console.log(response);
          this.commentAdded.emit();
        },
        (error) => {
          console.log(error);
        }
      );

      this.commentForm.reset();
    } 
  }
}
