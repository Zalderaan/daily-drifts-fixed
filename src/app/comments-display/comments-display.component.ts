import { Component, OnInit } from '@angular/core';
import { CommentsFService } from '../services/comments-f.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogFService } from '../services/blog-f.service';
// import { Blot}
import { response } from 'express';
import { error } from 'node:console';

@Component({
  selector: 'app-comments-display',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './comments-display.component.html',
  styleUrl: './comments-display.component.css'
})
export class CommentsDisplayComponent implements OnInit {
  comments: any[] = [];
  currentUserId: number | null = null;
  quillBlogConfig = {
    modules: {
      // blotFormatter: {},
    }
  }

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private commentsFService: CommentsFService,
    private blogFService: BlogFService
  ) {}

  ngOnInit(): void {
    this.fetchComments();
    this.currentUserId = this.getCurrentUserId();
  }

  fetchComments(): void {
    const blog_id = this.activatedRoute.snapshot.params['id'];
    this.commentsFService.getBlogComments(blog_id).subscribe(
      (response) => {
        this.comments = response.comments;
        console.log('Comments: ', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCommentAdded() {
    this.fetchComments();
  }

  getCurrentUserId(): number | null {
    return this.blogFService.getCurrentUserId();
  }

  editComment(comment_id: number): void {
    this.commentsFService.updateComment(comment_id).subscribe(
      (response) => {
        console.log(response);
      }, 
      (error) => {
        console.log(error);
      }
    );
  }

  deleteComent(comment_id: number): void {
    this.commentsFService.deleteBlogComment(comment_id).subscribe(
      (response) => {
        console.log(response);
        this.fetchComments();
      },
      (error) => {
        console.log(error)
      }
    )
  } 
}
